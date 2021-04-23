const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

const userOne = {username:"Will", password:"1234"}
const userTwo = {username:"Max", password:"1234"}

beforeAll(async ()=>{
  await db.migrate.rollback() //rollback and rebuild table
  await db.migrate.latest()
})

beforeEach(async ()=>{
  await db("users").truncate() //gets rid of data in users table (table remains intact)

})
afterAll(async ()=>{
  await db.destroy() //cuts off connection to db
})

//tests

test('sanity', () => {
  expect(true).toBe(true)
})

//API endpoints
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
  it("tests the response to be 200 ok with auth", async ()=>{
    await request(server).post('/api/auth/register').send(userOne)
    const login = await request(server).post('/api/auth/login').send(userOne)
    const token = login.body.token
    const res = await request(server).get('/api/jokes').set('Authorization', token)
    expect(res.status).toBe(200)
  })
  it("tests the response error to be 401 with no token", async ()=>{
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401)
  })
  it("tests the response message to be token required with no token", async ()=>{
    const res = await request(server).get('/api/jokes')
    expect(res.body).toBe("token required")
  })
  it("tests the response message to be token invalid with wrong token", async ()=>{
    const token = "1234567890WDAWDWADWADWADWADWASDASDASDASD"
    const res = await request(server).get('/api/jokes').set('Authorization', token)
    expect(res.body).toBe("token invalid")
  })
})