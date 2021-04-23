// Write your tests here
const request = require('supertest')
const server = require('./server')

const userOne = {username:"Will", password:"1234"}
const userTwo = {username:"Max", password:"1234"}

test('sanity', () => {
  expect(true).toBe(false)
})
describe("[POST] /auth/register testing", ()=>{
  it("tests the response", ()=>{

  })
  it("testing more", ()=>{
    
  })
})
describe("[POST] /auth/login testing", ()=>{
  it("tests the response", ()=>{

  })
  it("testing more", ()=>{

  })
})
describe("[GET] /jokes testing", ()=>{
  it("tests the response", ()=>{

  })
  it("testing more", ()=>{

  })
})