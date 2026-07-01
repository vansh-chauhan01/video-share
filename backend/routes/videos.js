import express from "express";
import { verifyToken } from "../utils/verify.js";
import {getByTag, search, addView , trend, random , sub ,addVideo ,deleteVideo, getVideo, updateVideo } from "../controllers/videos.js";


const router = express.Router();


router.post("/" , verifyToken , addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken , deleteVideo);
router.get("/find/:id" , getVideo);
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", search)



export default router;