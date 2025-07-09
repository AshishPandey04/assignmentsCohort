const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User}=require("../database/index")

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    //get inputs from user
    const {username,email,password}=req.body;

    if(username==""){
        return res.status(400).json({
            msg:"Username is Required"
        })
    }
    if(email==""){
        return res.status(400).json({
            msg:"email is Required"
        })
    }
    if(password==""){
        return res.status(400).json({
            msg:"password is Required"
        })
    }

     const exitedUser=  await User.findOne({
      $or: [{username},{email}]
   })
   if(exitedUser){
    return res.status(409).json({
        msg:"Username or Email already exists"
    })
   }

   const user = await User.create({
    username,
    email,
    password

   })
     const createdUser = await User.findById(user._id).select(
      "-password "
  )
   if(!createdUser){
    return res.status(500).json({
        msg:"Something went wrong while registery the user"
    })
   }
   return res.status(200).send(createdUser);
   
  
});

router.post('/login',async (req, res) => {
     // Implement user login logic


     // email and password
     const {email,password}=req.body;
     //check if email or password is empty 

     if(email===""){
        return res.status(400).json({
            msg:"Email is required"
        })
     }
     if(password===""){
        return res.status(400).json({
            msg:"password is required"
        })
     }
     const user = await User.findOne({
       email: { $eq: email } 
     })
     if(!user){
        return res.status(400).json({
            msg:"User is not found , Sign Up"
        })
     }
     if(user.password!=password){
        return res.status(401).json({
            msg:"password is wrong"
        })

     }

     const loggedInUser=await User.findById(user._id).select("-password")
  return res.status(200).json({
  msg: "User logged in successfully",
  user: loggedInUser
});


    
});

// router.get('/todos', userMiddleware, (req, res) => {
    // Implement logic for getting todos for a user

// });

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic

});

module.exports = router