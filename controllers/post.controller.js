import Post from "../models/post.model.js";
import User from "../models/user.model.js";
export const addPost = async (req, res) => {
  try {
    const userId = req.id;
    const { title, description } = req.body;
    const post = new Post({
      title,
      description,
      createdBy: userId,
    });
    await post.save();
    return res.status(201).json({ message: "You posted successfully", post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// using mongoose methods
// export const likeThePost = async (req,res) =>{
//     try {
//         const userId =req.id;
//         const {_id} = req.params;
//         const post = await Post.findById(_id);
//         if(!post){
//              return res.status(404).json({message:"Post Not found"})
//         }
//          if (post.likedBy.includes(userId)) {
//          return res.status(400).json({ message: "You have already liked this post." });
//     }
//         const details= await Post.findByIdAndUpdate(_id,{ $push:{likedBy:userId},likes:post.likedBy.length+1},{new:true})

//         return res.status(200).json({message:"you liked the post",details})
//     } catch (error) {
//         return res.status(500).json({message:"Internal server error", error:error.message})
//     }
// }

//like the post using array methods
// export const likeThePost = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { _id } = req.params;
//     const post = await Post.findById(_id);
//     if (!post) {
//       return res.status(404).json({ message: "Post Not found" });
//     }
//     let likedList = post.likedBy;
//     let totalLikes = likedList.length;
//     if (post.likedBy.includes(userId)) {
//       let newList = [];
//       newList = likedList.filter((value) => {
//         return value != userId;
//       });
//       totalLikes = newList.length;
//       const details = await Post.findByIdAndUpdate(
//         _id,
//         { likedBy: newList, likes: totalLikes },
//         { new: true }
//       );
//       return res
//         .status(200)
//         .json({ message: "you disliked the post", details });
//     }
//     likedList.push(userId);
//     totalLikes = likedList.length;
//     const details = await Post.findByIdAndUpdate(
//       _id,
//       { likedBy: likedList, likes: totalLikes },
//       { new: true }
//     );
//     return res.status(200).json({ message: "you liked the post", details });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

// Modified
export const likeThePost = async (req, res) => {
  try {
    const userId = req.id;
    const { _id } = req.params;
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).json({ message: "Post Not found" });
    }
    let likedList = post.likedBy;
    let isLiked = false;
    if (post.likedBy.includes(userId)) {
      likedList = likedList.filter((value) => {
        return value != userId;
      });
    } else {
      likedList.push(userId);
      isLiked = true;
    }
    let totalLikes = likedList.length;
    const details = await Post.findByIdAndUpdate(
      _id,
      { likedBy: likedList, likes: totalLikes },
      { new: true }
    );

    return res.status(200).json({
      message: isLiked
        ? "You liked the post"
        : "You disliked you disliked the post",
      details,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// for user
export const getAllPostOfUser = async (req, res) => {
  try {
    const userId = req.id;
    const posts = await Post.find({ createdBy: userId });

    if (posts.length == 0) {
      return res.status(400).json({ message: "You have not posted yet." });
    }

    return res.status(200).json({ message: "You all posts", posts });
  } catch (error) {}
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length == 0) {
      return res.status(400).json({ message: "No one has psoted yet" });
    }
    return res.status(200).json({ message: "posts", posts });
  } catch (error) {}
};
