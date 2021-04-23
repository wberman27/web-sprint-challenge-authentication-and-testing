const jwtSecret = process.env.JWT_SECRET || "shh" //use env secret or fallback to "shh"

module.exports = {
  jwtSecret
}