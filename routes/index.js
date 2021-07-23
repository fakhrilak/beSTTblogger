const express = require('express');
const router = express.Router();

const {login,register, Auth, registerAdmin, postPasswords, changepassword} = require("../controller/auth");
const {auth, authAdmin} =require("../middleware/protectAuth")
const { createPost, getContentId, getAllContent, thumbnil,editPost } = require('../controller/Post');
const { upload,EditProfile } = require('../middleware/uploadImage');
const { postCommand, getAcceptedPost, getTagihan, editTagihan } = require('../controller/Admin');
const { editProfile } = require('../controller/profile');

router.post("/login",login);
router.post("/register",register);
router.post("/register-admin",authAdmin,registerAdmin);
router.get("/auth",auth,Auth)
router.post("/change-passwors",auth,postPasswords)
router.patch("/newPasswords",auth,changepassword)


router.post("/content",auth,upload("file"),createPost)
router.get("/thumbnil/:tumbname",thumbnil)
router.get("/content/:id",getContentId)
router.get("/content",auth,getAllContent)
router.patch("/content",auth,editPost)


router.patch("/profile",auth,EditProfile("file"),editProfile)

router.post("/command",auth,postCommand)

router.get("/accepted-post",getAcceptedPost)

router.get("/tagihan",authAdmin,getTagihan)
router.patch("/tagihan",authAdmin,upload("file"),editTagihan)






module.exports = router