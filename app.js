const express = require('express');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const tesseract = require('node-tesseract');
var ImageName;//stored in ./IncomingImages

const app = express();
app.use(bodyParser.json());

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./IncomingImages");
    },
    filename: function (req, file, callback) {
        ImageName = file.fieldname.slice(0, 4) + "_" + Date.now() + "_" + file.originalname.slice(-5);
        callback(null, ImageName);
    }
});

app.set('port', process.env.PORT || 8000);
app.set('hostname',"10.50.18.105");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Update_index.html");
});

app.post("/UploadImage", function (req, res) {
    var upload = multer({
        storage: Storage,
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.tif') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single("imgUploader");


    upload(req, res, function (err) {
        if (err) {
            res.send("Something went wrong!");
        }
        else {
            console.log("Everything going good so far:file uploaded to server");
            getTextInImage(ImageName);
        }
    });

    var getTextInImage = function (imageName) {
        tesseract.process(__dirname + "/IncomingImages/"+ImageName, {
            l: 'eng',
            psm: 1
        }, function (err, text) {
            if (err) {
                console.error(err);
            } else {
                console.log(text);
                res.end(text);
            }
        });
    };

});

app.listen(app.get('port'),app.get('hostname'), function () {
    console.log("the server started at:" +app.get('hostname')+":"+ app.get('port'));
});
