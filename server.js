const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth } = require("./middlewares/auth");
const verify = require("./controllers/verify");
const generate = require("./controllers/generate");

require("dotenv").config({ path: __dirname + "/.env" });



const app = express();

app.use(express.json());

app.post(
  "/generate",
  body("fullName", "fullName must be provided").exists(),
  body("softwareName", "softwareName must be provided").exists(),
  body("secret", "secret must be provided").exists(),
  auth,
  generate
);

app.post(
  "/verify",
  body("fullName", "fullName must be provided").exists(),
  body("key", "key must be provided").exists(),
  auth,
  verify
);

app.listen(3601, function () {
  console.log("listening 3601");
});

module.exports = app;
