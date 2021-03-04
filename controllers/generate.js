const { body, validationResult } = require("express-validator");

let crypto;
try {
  crypto = require("crypto");
} catch (err) {
  console.log("crypto support is disabled!");
}


const generate = (req, res) => {
  const secret = process.env["API_SECRET"];

  console.log(secret)

  const errors = validationResult(req);
  const name = req.body["fullName"];
  const softwareName = req.body.softwareName;

  // TODO: Implement error handling

  console.log('req', req);



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
};

module.exports = generate;
