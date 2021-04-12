const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const whModels = require("./mongo/wh_models.js")
const userAccounts = whModels.userAccounts;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
dotenv.config();

// user and pwd
const mongoUser = process.env.mongoUSER;
const mongoPwd = process.env.mongoPWD;
passport.serializeUser((user,done)=>{
  done(null,user.id);
});
passport.deserializeUser((id,done)=>{
  userAccounts.findById(id,(err,user)=>{
    done(err,user);
  });
});
const enterTheID = (details) => {
  const acceptable_input = /^[0-9_$a-z]+/;
  if ((details.match(acceptable_input))) {
    if (details != null) {
      return true;
    }
  } else {
    return false;
  }
};

const loginSuccessChecker = (username, password) => {
  if (username != null && password != null) {
    if (typeof username != undefined && typeof password != undefined) {
      return true;
    }
  } else {
    return false;
  }
};


// passport.use( new JwtStrategy( { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: "temporary_secret"
// },
//   async (payload, done) => {
//     userAccounts.findById(payload.sub, (err, user) => {
//       if (err) {
//         done(err, false)
//       } 
//       else {
//         if (!user) {
//           return done(null, false)
//         }
//         done(null, user)
//       }
//     })
//   })
// )

passport.use('login', new LocalStrategy({usernameField:'username'},(username, password, done) => {
  const uri = `mongodb+srv://${mongoUser}:${mongoPwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
  mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});
  userAccounts.findOne({ username: username}, (err, user) => {
      if (err) throw err;
      if(!user){
        
        const newUser=new userAccounts({username,password});
        console.log(newUser);
        bcrypt.genSalt(10,(err,salt)=>{
          if(err) throw err;
          bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password=hash;
            newUser
              .save()
              .then(user=>{
                return done(null,user);
              })
              .catch(err=>{
                return done(null,false,{message:err});
              });
          });
        });
      }
      else{
        console.log(password,user.password);
        bcrypt.compare(password,user.password,(err,isMatch)=>{
          if(err) throw err;
          if(isMatch){
            console.log("Matches");
            return done(null,user,{message:"Matches"});
          }
          else{
            console.log("Wrong password");
            return done(null,false,{message:"wrong password"});
          }
        });
      }
    })
  })
)

const signToken = (user) =>{
  JWT.sign(
    {
      iss: "Login",
      sub: user.id,
      iat: Date.now(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    "temporary_secret"
  )
}

router.use((req, res, next) => {
  if (req.passportErrorMessage) {
    res.passportErrorMessage = req.passportErrorMessage
  }
  next()
})

// router.get('/', passport.authenticate('jwt', {session : false}), (req, res) => {
//   const uri = `mongodb+srv://${mongoUser}:${mongoPwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
//   mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true});
//   res.json({user: req.user})
//   mongoose.disconnect()
// })

// router.post('/', passport.authenticate('signin', {session : false}), (req, res) => {
//   const uri = `mongodb+srv://${mongoUser}:${mongoPwd}@clusterwh.bhiht.mongodb.net/user_accounts?retryWrites=true&w=majority`;
//   mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true});
//   res.json({token: signToken(req.user)})
//   mongoose.disconnect()
// })

router.post('/login',(req,res,next)=>{
  console.log('request received');
  passport.authenticate('login',function(err,user,info){
    if(err) throw err;
    if(!user){
      return res.status(400)//,json({errors:'No user found'});
    }
    req.logIn(user,function(err){
      if(err) throw err;
      return res.status(200)//.json({success: 'logged in '});
    });
  })(req,res,next);
});
 
module.exports = {
  passport:passport,
  router:router,
  enterTheID:enterTheID,
  loginSuccessChecker:loginSuccessChecker,
};