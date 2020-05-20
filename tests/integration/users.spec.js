const request = require('supertest')
const app = require('../../app')

describe('GET /users', () => {
  it('should get all users', async () => {
    await request(app)
      .post('/users')
      .send([{ email: 'foo@example.com' }])

    await request(app)
      .get('/users')
      .expect([
        '{"id":"00001","email":"foo@example.com"}'
      ])
  })
})
