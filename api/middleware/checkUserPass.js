const checkUserPass = (req, res, next) =>{
    let user = req.body
    if(!user.username || !user.password){
        res.status(500).json("username and password required")
      }else{
          next()
      }
}

module.exports = {
    checkUserPass
}