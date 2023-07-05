const router = require("express").Router();
const pruebaRetry = require("./pruebaRetry");
router.use("/pruebaRetry", pruebaRetry);

router.post("/", function (req, res) {
  res.status(200).json({ message: "Esta api no acepta peticiones POST!." });
});

module.exports = router;
