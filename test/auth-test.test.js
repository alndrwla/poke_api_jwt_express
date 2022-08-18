const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const app = require('../index').app
const API = require('../index').API

describe('Suite os test auth', () => {
  it('should return 401 when no jwt available', (done) => {
    chai.request(app)
      .get(API + '/team')
      .end((err, res) => {
        chai.assert.equal(res.status, 401)
        done()
    })
  })

  it('should return 200 when jwt is valid', (done) => {

    chai.request(app)
    .post(API + '/login')
    .end((err, res) => {
      chai.request(app)
        .get(API + '/team')
        .set('Authorization', `JWT ${res.body.toekn}`)
        .end((err, res) => {
          chai.assert.equal(res.status, 200)
          done()
        })
    })
  })

})