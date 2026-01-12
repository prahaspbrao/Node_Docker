import express from "express";
import {createPost, deletePost, getAllPosts, getOnePosts, updatePost} from "../controller/postController.js"

const router = express.Router();

router.get("/" , getAllPosts);
router.post("/post" , createPost);
router.get("/:id" , getOnePosts);
router.patch("/update" , updatePost);
router.delete("/delete" , deletePost);

export  default router;

