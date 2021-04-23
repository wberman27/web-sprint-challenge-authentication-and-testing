const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization; //get token

  //if not token send error
  if(!token){
    res.status(401).json("token required")
  }else{
    //use jwt to verify that the token and secret and correct
    jwt.verify(token, jwtSecret, (err, decoded) =>{
      if(err){
        res.status(401).json("token invalid") //error if token is wrong
      }else{
        req.decodedToken = decoded; //save this decoded token if needed later
        next() //if token valid move on
      }
    })
  }
};
