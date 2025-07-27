import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";


import {
  saveJobForLater,
  getSavedJobs,
  removeSavedJob
} from "../controllers/user.controller.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

router.post("/bookmark/:jobId", isAuthenticated, saveJobForLater);
router.get("/bookmarks", isAuthenticated, getSavedJobs);


router.delete("/bookmark/:jobId", isAuthenticated, removeSavedJob);

export default router;