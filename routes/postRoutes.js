import express from "express";
import {createPost, deletePost, getAllPosts, getOnePosts, updatePost} from "../controller/postController.js"

const router = express.Router();

router.get("/" , getAllPosts);
router.post("/post" , createPost);
router.get("/:id" , getOnePosts);
router.patch("/update/:id" , updatePost);
router.delete("/delete/:id" , deletePost);

export  default router;

