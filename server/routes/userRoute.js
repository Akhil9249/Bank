const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { checkAuth } = require("../middleware/checkAuth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);


router.get("/dashboard",checkAuth, userController.dashboard);
router.get("/refresh-token",checkAuth, userController.refreshToken);

router.put("/deposit",checkAuth, userController.deposit);
router.put("/withdrawel",checkAuth, userController.withdrawal);






module.exports = router;