import Blog from "../models/blogs.model.js"
import User from "../models/user.model.js";

export const getBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find().populate("author","username").sort({ createdAt: -1 });
        res.json(blogs.map(blog => ({
            ...blog.toObject(),
            thumbnail: blog.thumbnail
        })));
    } catch (error) {
        res.status(500).json({message:error.message || "Internal server error"});
    }
}

export const createBlog = async(req,res)=>{
    try {
        const { title, content, category } = req.body;  
        const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;
        const blog = new Blog({
            title,
            content,
            category,
            thumbnail,
            author:req.user.id
        })        
        await blog.save();

        // Update the user's blogs array
        await User.findByIdAndUpdate(req.user.id, {
            $push: { blogs: blog._id }
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const getBlogsbyCat = async (req, res) => {
    try {
      const blogs = await Blog.find({ category: req.params.category })
        .populate("author", "username")
        .sort({ createdAt: -1 });
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found in this category" });
        }
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "username");
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const updateBlog = async(req,res)=>{
    try {
        const {title,content,category} = req.body
        const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;
        const blog = await Blog.findByIdAndUpdate(req.params.id,{
            title,
            content,
            category,
            thumbnail,
        },{new:true})
        res.json(blog)
    } catch (error) {
        res.status (500).json({message:error.message || "Internal server error"})
    }
  }

export const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.id }).populate("author", "username").sort({createdAt:-1});
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found for this user" });
        }
        res.json(blogs.map(blog => ({
            ...blog.toObject(),
            thumbnail: blog.thumbnail
        })));
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const deleteBlog = async(req,res) =>{
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }
        res.json({message:"Blog deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message || "Internal server error"})
    }
}

export const likeBlogs = async(req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id)
        if(blog.likes.includes(req.user.id)){
            blog.likes = blog.likes.filter((userId)=>(userId.toString()!== req.user.id))
        }else{
            blog.likes.push(req.user.id)
        }

        await blog.save()
        res.json({message:"Blog liked successfully" , likes : blog.likes.length})
    } catch (error) {
        res.status(500).json({message:error.message || "Internal server error"})
    }
}