const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secrets/index');
const Users = require('../users/users-model')
const { checkUserPass } = require('../middleware/checkUserPass')

router.post('/register', checkUserPass, (req, res) => {
  let user = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8; //allows the round of hashing to use env or 8
  const hash = bcrypt.hashSync(user.password, rounds); //create a hash for password, with defined rounds
  user.password = hash; //the user password is now the hash

  Users.add(user) //add registered user to db
  .then(addedUser =>{
    res.status(201).json(addedUser);
  })
  .catch(() =>{
    res.status(401).json("username taken")
  });
});

router.post('/login', checkUserPass, async (req, res, next) => {
  try{
    const {username, password} = req.body;
    const [user] = await Users.findBy({username});
    if(user && bcrypt.compareSync(password, user.password)){ //bcrypt compares passwords
      const token = makeToken(user); //make token for user
      res.status(200).json({message: `welcome, ${username}`, token}) //welcome and give token
    }else{
      res.status(401).json("invalid credentials")
    }
  }catch(err){
    next(err)
  }
});

//this function will make a token, taking in a user
function makeToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = { //configurations for the token
    expiresIn: "120s"
  };
  return jwt.sign(payload, jwtSecret, options); //this signs/creates the token
}

module.exports = router;
