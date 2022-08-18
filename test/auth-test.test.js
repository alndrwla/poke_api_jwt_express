const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const app = require('../index').app
const API = require('../index').API

describe('Suite os test auth', () => {
  it('should return 401 when no jwt available', (done) => {
    chai.request(app)
      .get(API + '/teams')
      .end((err, res) => {
        chai.assert.equal(res.status, 401)
        done()
    })
  })

  it('Should return 200 and token for success login', (done) => {
    chai.request(app)
      .post(API + '/auth/login')
      .set('conten-type', 'application/json')
      .send({user: 'alexander', password: 'password'})
      .end((err, res) => {
        chai.assert.equal(res.status, 200)
        done()
      })
  })

  it('should return 200 when jwt is valid', (done) => {

    chai.request(app)
    .post(API + '/auth/login')
    .set('content-type', 'application/json')
    .send({ user: 'alexander', password: 'password' })
    .end((err, res) => {
      chai.assert.equal(res.status, 200)
      chai.request(app)
        .get(API + '/teams')
        .set('Authorization', `JWT ${res.body.token}`)
        .end((err, res) => {
          chai.assert.equal(res.status, 200)
          done()
        })
    })
  })

})