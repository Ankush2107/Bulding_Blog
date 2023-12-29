const Post = require('../models/Post.js');

const HomePage = async (req, res) => {
    
    try {
        const locals = {
            title: "Nodejs Blog",
            description: "Simple blog created with NodeJs, Express & MongoDb." 
        }
        let perPage = 6;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ {$sort: {createdAt: -1}} ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        // Counts the total number of posts in the database
        const count = await Post.count();

        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });
    } catch(error) {
        console.log(error);
    }
};

const AboutPage = (req, res) => {
    res.render('about', {
        currentRoute: '/about'
    })
};

const ContactPage = (req, res) => {
    res.render('contact', {
        currentRoute: '/contact'
    })
}

const findPostById = async(req, res) => {
    try{
        const data = await Post.findById({ _id: req.params.id });
        const locals = {
            title: data.title,
            description: "Simple blog created with NodeJs, Express & MongoDb." 
        }
        res.render('post', {locals, data, currentRoute: `/post/${req.params.id}`});
    } catch(err) {
        console.log(err);
    }
}

const SearchPost = async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Simple blog created with NodeJs, Express & MongoDb."
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-z0-9]/g, "");

        const data = await Post.find({
            $or: [
                {title: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
                {body: {$regex: new RegExp(searchNoSpecialChar, 'i')}}
            ]
        });

        res.render("search", {
            data, 
            locals
        });
    } catch(error) {
        console.log(error);
    }
};



module.exports = {
    HomePage,
    AboutPage,
    ContactPage,
    findPostById,
    SearchPost,

}