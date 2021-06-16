const express = require('express');
const router = express.Router();

const {login,register, Auth} = require("../controller/auth");
const {auth} =require("../middleware/protectAuth")
const { createPost, getContentId, getAllContent, thumbnil,editPost } = require('../controller/Post');
const { upload } = require('../middleware/uploadImage');
const { postCommand, getAcceptedPost } = require('../controller/Admin');
const { editProfile } = require('../controller/profile');

router.post("/login",login);
router.post("/register",register);
router.get("/auth",auth,Auth)


router.post("/content",auth,upload("file"),createPost)
router.get("/thumbnil/:tumbname",thumbnil)
router.get("/content/:id",getContentId)
router.get("/content",auth,getAllContent)

router.post("/edit-content",editPost)
router.post("/edit-profile",auth,upload("file"),editProfile)

router.post("/command",auth,postCommand)

router.get("/accepted-post",getAcceptedPost)






module.exports = router