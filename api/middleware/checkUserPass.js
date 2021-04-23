//middleware used to check that a username and password are given
const checkUserPass = (req, res, next) =>{
    let user = req.body
    if(!user.username || !user.password){ //if either of them are false, give error
        res.status(403).json("username and password required")
      }else{
          next()
      }
}

module.exports = {
    checkUserPass
}