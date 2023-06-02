const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello, Its user Route");
});

module.exports = router;
