const jwt = require("jsonwebtoken")
const { User } = require("../database/index");


async function userMiddleware(req, res, next) {
    // Implement user auth logic
    
    // here we will verify is there is acesstoken and does  it match with the access token we have given while login the user 
    //if both the conditions comes true that means user is login 
    // or else logout out 

  try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        res.status(401).json({
            msg:"Unauthorized token"
        })
    }

    const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password -accessToken")

    if(!user){
        res.status(401).json({
            msg:"Invalid Access Token"
        })
    }

    req.user=user
    next();
  } catch (error) {
    res.status(500).json({
        msg:error?.message
    })
    
  }


}

module.exports = userMiddleware;