const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")
const { checkAuth } = require("../middleware/checkAuth");

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);


router.get("/dashboard",checkAuth, adminController.dashboard);
router.get("/refresh-token",checkAuth, adminController.refreshToken);
router.get("/sigletransation/:id",adminController.sigletransation);

router.put("/userAuth", adminController.userauth);






module.exports = router;