import express from "express";
import {createPost, deletePost, getAllPosts, getOnePosts, updatePost} from "../../controller/postController.js"
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/" ,protect, getAllPosts);
router.post("/post" ,protect , createPost);
router.get("/:id" ,protect, getOnePosts);
router.patch("/update/:id" ,protect , updatePost);
router.delete("/delete/:id" ,protect, deletePost);

export  default router;

