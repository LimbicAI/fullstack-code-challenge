const router = require("express").Router();

router.use("/api/login", require("./controllers/login"));
router.use("/api/user", require("./controllers/user"));
router.use("/api/question", require("./controllers/question"));
router.use("/api/answer", require("./controllers/answer"));

module.exports = router;