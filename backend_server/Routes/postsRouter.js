const router = require("express").Router();
const PostModel = require("../models/post");
const User = require("../models/user");

// to create a post
router.post("/", async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    const createdPost = await newPost.save();
    res.status(200).json(createdPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//to update a post
router.put("/:id", async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  try {
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Update your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//to delete a post
router.delete("/:id", async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  try {
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("Post Deleted");
    } else {
      res.status(403).json("Deletete your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//to like a post
router.put("/:id/like", async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  try {
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("You liked this post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("You have disliked the post");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get a single post

router.get("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/timeline/all", async (req, res) => {
  try {
    const currUser = await User.findById(req.body.userId);
    const userPosts = await PostModel.find({ userId: currUser._id });
    const followingPosts = await Promise.all(
      currUser.followings.map((followingId) => {
        return PostModel.find({ userId: followingId });
      })
    );

    res.json(userPosts.concat(...followingPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
