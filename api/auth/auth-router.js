const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secrets/index');
const Users = require('../users/users-model')
const { checkUserPass } = require('../middleware/checkUserPass')

router.post('/register', checkUserPass, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8); //create a hash for password, with 8 rounds
  user.password = hash; //the user password is now the hash

  Users.add(user)
  .then(addedUser =>{
    res.status(201).json(addedUser);
  })
  .catch(() =>{
    res.status(401).json("username taken")
  });


  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', checkUserPass, async (req, res, next) => {
  try{
    const {username, password} = req.body;
    const [user] = await Users.findBy({username});
    if(user && bcrypt.compareSync(password, user.password)){ //bcrypt compares passwords
      const token = makeToken(user); //make token for user
      res.status(200).json({message: `welcome, ${username}`, token})
    }else{
      res.status(401).json("invalid credentials")
    }
  }catch(err){
    next(err)
  }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
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
