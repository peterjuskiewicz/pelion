const express = require("express");
const { body, validationResult } = require("express-validator");

// TODO: Clean the code

let crypto;
try {
  crypto = require("crypto");
} catch (err) {
  console.log("crypto support is disabled!");
}

// TODO: Create folder structure

// TODO: Move to env file
const secret = "abcdefg";

const app = express();

app.use(express.json());

app.post(
  "/generate",
  body("fullName", "fullName must be provided").exists(),
  body("softwareName", "softwareName must be provided").exists(),
  body("secret", "secret must be provided").exists(),
  (req, res) => {
    //TODO: Extract to controllers

    const errors = validationResult(req);
    const name = req.body["fullName"];
    const softwareName = req.body.softwareName;

    // TODO: Implement error handling

    console.log(errors);

    if (req.body["secret"] !== secret) {
      res.status(401);
      res.send("401 Unauthorized");
    }

    // TODO: Consider using different module

    const hash = crypto.createHmac("sha256", secret).update(name).digest("hex");

    // TODO: Research ways to produce key

    const key = `${softwareName}-${hash}`;

    res.status(200);
    res.send(key);
  }
);

app.post(
  "/verify",
  body("fullName", "fullName must be provided").exists(),
  body("key", "key must be provided").exists(),
  (req, res) => {
    //TODO: Extract to controllers

    const errors = validationResult(req);
    const name = req.body["fullName"];
    const key = req.body.key;

    // TODO: Implement error handling

    console.log(errors);

    // get encrypted name
    const encryptedName = key.split("-")[1];
    // encrypt name
    const hash = crypto.createHmac("sha256", secret).update(name).digest("hex");
    // compare encrypted names
    if (encryptedName === hash) {
      res.status(204);
      res.send("success");
      console.log("success");
    } else {
      res.status(404);
      res.send("fail");
    }

    console.log(key);
  }
);

app.listen(3601, function () {
  console.log("listening 3601");
});

module.exports = app;
