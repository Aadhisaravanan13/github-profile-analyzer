const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        message: "Github route working",
    });
});

const {
    analyzerProfile,
    getAllProfiles
} = require("../controllers/githubController")

router.get("/analyzer/:username", analyzerProfile);
router.get("/profiles", getAllProfiles);

module.exports = router;
