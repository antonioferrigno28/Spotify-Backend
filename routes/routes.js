const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controllers");

router.get("/callback", Controller.validateAccess);
router.get("/user-info", Controller.fetchUserInfo);
router.get("/top-artists", Controller.fetchTopArtists);
module.exports = router;
