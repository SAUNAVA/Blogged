import Blog from "../models/blogs.model.js";
import express from "express";
import { createBlog, getBlogById, getBlogs, getBlogsbyCat, getUserBlogs, updateBlog , deleteBlog, likeBlogs} from "../controllers/blogController.js";
import { authCheck } from "../middleware/authCheck.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.resolve(), 'uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage})
const router = express.Router();

router.get('/',getBlogs)
router.post('/',upload.single('image'),authCheck, createBlog)

router.get('/category/:category', getBlogsbyCat)
router.get('/user', authCheck , getUserBlogs)
router.get('/:id', getBlogById); // Add this route to fetch a blog by ID
router.put('/:id',authCheck,updateBlog)
router.delete('/:id', authCheck , deleteBlog)
router.put('/like/:id', authCheck , likeBlogs)
export default router