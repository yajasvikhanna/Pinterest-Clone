var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require('passport');
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */       
router.get('/',  function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',  function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/feed',  function(req, res, next) {
  res.render('feed');
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render("profile")
});


router.post('/register', function(req,res){
  const {username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname});

 userModel.register(userData, req.body.password)
 .then(function()
 {
  passport.authenticate("local")(req,res,function(){
    res.redirect("/profile");
  })
  })
 })

 router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login"
 }) ,function(req,res){

 })

router.get("/logout", function(req,res)
{
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;





















//________________________________________________________________________________________________________________________________________________

// router.get('/alluser', async function(req,res)
// {
//  let users =  await userModel.findOne({_id: "6556120a3a74ddc5f6050461" })
//  .populate('posts')
//  res.send(users);

// })
// router.get("/createUser",async function(req,res)
//  {
//  let createduser = await userModel.create({
//   username:"Bhavook",
//   password: "Bhavook",
//   posts: [],
//   email: "bhavookkhanna@gmail.com",
//   fullName: "Bhavook Khanna",
//  });

// });

//  router.get("/createPost",async function(req,res)
//  {
//   let createdpost = await postModel.create({
//     postText:"Hello How are you doing",
//     user: "6556120a3a74ddc5f6050461"
//   });

//    let user = await userModel.findOne({_id: "6556120a3a74ddc5f6050461"})
//    user.posts.push(createdpost._id);
//   await user.save();
//   res.send("done");
// })