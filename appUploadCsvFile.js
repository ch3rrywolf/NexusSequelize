const express = require("express");
const fileUpload = require("express-fileupload");
const csv = require("csv-parser");
const fs = require("fs");
const User = require("./models/user");

const app = express();
const port = 3000;

app.use(fileUpload());

// Upload CSV file
app.post("/upload", (req, res) => {
    if (!req.files || !req.files.csv) {
        return res.status(400).send("No files where uploaded.");
    }
    const csvFile = req.files.csv;

    csvFile.mv(`${__dirname}/uploads/${csvFile.name}`, err => {
        if (err) {
            return res.status(500).send(err);
        }

        // Parse and import the CSV data into the database
        const results = [];
        fs.createReadStream(`uploads/${csvFile.name}`)
        .pipe(csv())
        .on("data", data => {
            results.push(data);
        })
        .on("end", () => {
            User.bulkCreate(results)
            .then(() => {
                res.send("CSV data imported successfully.");
            })
            .catch(err => {
                res.status(500).send("Error importing CSV data.");
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});