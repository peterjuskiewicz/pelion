const express = require("express");
const { body, validationResult } = require("express-validator");

let crypto;
try {
  crypto = require("crypto");
} catch (err) {
  console.log("crypto support is disabled!");
}


// TODO: Move to env file
const secret = "abcdefg";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/generate",
  body("full-name", "full-name must be provided").exists(),
  body("software-name", "software-name must be provided").exists(),
  body("secret", "secret must be provided").exists(),
  (req, res) => {

    const errors = validationResult(req);
    const name = req.body['full-name'];
    const softwareName = req.body['software-name']

    console.log(errors);

    

    if(req.body['secret'] !== secret) {
        res.status(401)
        res.send('401 Unauthorized')
    }

    const hash = crypto.createHmac("sha256", secret).update(name).digest("hex");

    const something = 'blablabla'

    const key = `${softwareName}-${hash}`

    res.send(key);
  }
);

app.get("/verify", (req, res) => {
  res.send("Hello world");
});

app.listen(3601, function () {
  console.log("listening 3601");
});
