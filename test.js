const request = require("supertest");
const app = require("./server");
let crypto;
try {
  crypto = require("crypto");
} catch (err) {
  console.log("crypto support is disabled!");
}
describe("/generate endpoint", () => {
  it("should return 401 when incorrect secret provided", async () => {
    const res = await request(app).post("/generate").send({
      fullName: "piotr juskiewicz",
      softwareName: "Windows",
      secret: "bla",
    });
    expect(res.statusCode).toEqual(401);
  });
  it("should return licence key when correct secret provided", async () => {
    const res = await request(app).post("/generate").send({
      fullName: "piotr juskiewicz",
      softwareName: "Windows",
      secret: "abcdefg",
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("/verify endpoint", () => {
  const name = "piotr juskiewicz";

  const hash = crypto
    .createHmac("sha256", "abcdefg")
    .update(name)
    .digest("hex");

  const key = `someSoftware-${hash}`;

  it("should return 204 when correct data provided", async () => {
    const res = await request(app).post("/verify").send({
      fullName: name,
      key: key,
    });
    expect(res.statusCode).toEqual(204);
  });
  it("should return 404 when incorrect data provided", async () => {
    const res = await request(app).post("/verify").send({
      fullName: "Name to fail",
      key: key,
    });
    expect(res.statusCode).toEqual(404);
  });
});
