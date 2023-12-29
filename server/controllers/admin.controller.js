const Post = require('../models/Post.js');
const User = require('../models/User.js');
const adminLayout = '../views/layouts/admin';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

const GetAdmin = async (req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "Simple blog created with NodeJs, Express & MongoDb."
        }
        res.render('admin/index', {locals, layout: adminLayout});
    } catch (error) {
        console.log(error);
    }
}

const PostAdmin = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username });

        if(!user) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({ message: 'invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret);
        res.cookie('token', token, {httpOnly: true});
        res.redirect('/dashboard');
    } catch(error) {
        console.log(error);
    }
}

const Dashboard = async (req, res) => {
    try {
        const locals = {
            title: 'Dashboard',
            description: "Simple blog created with NodeJs, Express & MongoDb."
        }

        const data = await Post.find();
        res.render('admin/dashboard', {
            locals, data, layout: adminLayout
        });
    } catch (error) {
        console.log(error);
    }
}

const GetAddPost = async (req, res) => {
    try {
        const locals = {
            title: 'Add Post',
            description: "Simple blog created with NodeJs, Express & MongoDb."
        }

        const data = await Post.find();
        res.render('admin/add-post', {
            locals, layout: adminLayout
        });
    } catch (error) {
        console.log(error);
    }
}; 

const AddPost = async (req, res) => {
    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });
            await Post.create(newPost);
            res.redirect('/dashboard');
        } catch (error) {
            console.log(error);
        }
    } catch {
        console.log(error);
    }
};

const EditPost = async (req, res) => {
    try {
        const locals = {
            title: "Edit Post",
            description: "Free Nodejs user management system" 
        } 
        const data = await Post.findOne({ _id: req.params.id });

        res.render('admin/edit-post', {
            locals, data, layout: adminLayout
        })
         
    } catch {
        console.log(error);
    }
};

const UpdateEditPost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });

        res.redirect(`/edit-post/${req.params.id}`)
    } catch {
        console.log(error);
    }
};

const Register = async (req, res) => {
    try{
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({username, password: hashedPassword});
            res.status(201).json({message: 'User created', user});
        } catch(error) {
            if(error.code === 11000) {
                res.status(409).json({message: 'User already in use'});
            }
            res.status(500).json({message: 'Internal server error'});
        }
    }
    catch(error) {
        console.log(error);
    }
};

const DeletePost = async (req, res) => {
    try {
        await Post.deleteOne( { _id: req.params.id } );
        res.redirect('/dashboard');
    } catch(error) {
        console.log(error);
    }
};

const Logout =  async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

module.exports = {
    GetAdmin,
    PostAdmin,
    Dashboard,
    GetAddPost,
    AddPost,
    EditPost,
    UpdateEditPost,
    Register,
    DeletePost,
    Logout
}