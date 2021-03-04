const verify = (req, res) => {
  //TODO: Extract to controllers

  const errors = validationResult(req);
  const name = req.body["fullName"];
  const key = req.body["key"];

  if (errors) {
    res.status(401);
    res.send("401 Unauthorized");
  }

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
};

module.exports = verify;
