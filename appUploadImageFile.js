const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const router = express.Router();
const sequelize = require('./config/database');
const File = require("./models/File");
const app = express();

// Middleware
app.use(bodyParser.json());

(async () => {
    // Sync the models with the database
    await sequelize.sync();
    console.log("done");
})();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Define where to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    }
});

const upload = multer({ storage });

// Route for uploading a file
app.post("/upload", upload.single("file"), (req, res) => {
    // Store file information in the database using the Sequelize model
    const { originalname, path } = req.file;
    File.create({ filename: originalname, path })
    .then(() => {
        res.send("File uploaded successfully");
    })
    .catch(err => {
        res.status(500).send("Error uploading the file");
    });
});

// Route for fetching a file
app.get("/file/:id", (req, res) => {
    const fileId = req.params.id;
    File.findByPk(fileId)
    .then(file => {
        if (!file) {
            return res.status(404).send("File not found");
        }
        res.download(file.path); // Send the file for download
    })
    .catch(err => {
        res.status(500).send("Error fetching the file");
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port", port);
});