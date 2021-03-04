const generate = (req, res) => {
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
};

module.exports = generate;
