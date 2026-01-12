import Post from "../models/postModel.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    if (!posts) {
      return res.status(400).json({
        status: "Failed",
      });
    }

    return res.status(200).json({
      status: "Success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    console.log(error);

    return res.json(400).json({
      status: "Failed",
    });
  }
};

export const getOnePosts = async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      status: "Failed",
    });
  }

  try {
    const post = await Post.findOne({ title: title });

    if (!post) {
      return res.status(400).json({
        status: "Failed",
      });
    }

    return res.status(200).json({
      status: "Success",
      results: post.length,
      data: post
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Failed",
    });
  }
};
