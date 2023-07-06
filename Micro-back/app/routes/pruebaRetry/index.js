const router = require("express").Router();
const port = process.env.PORT;
router.get("/", async (req, res) => {
  try {
    // console.log(req.query);
    res.json({
      message: "Esto es una petición al microservicio en puerto " + port,
      status: 200,
    });
    // res.json({
    // message: "Esto es una petición al microservicio en puerto " + port,
    // status: 409,
    // });
    return;
  } catch (error) {
    res.json({ message: "Error", status: 200 });
  }
});

router.post("/", async (req, res) => {
  res.json({ message: "¡Esta api no acepta peticiones POST!" });
});

module.exports = router;
