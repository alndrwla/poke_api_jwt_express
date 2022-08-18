const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const app = require('../index').app
const API = require('../index').API

describe('Suite of test e2e', () => {
  it('Should return hello world', (done) =>{
    chai.request(app)
    .get(API + '/')
    .end((err, res) => {
      chai.assert.equal(res.text, 'hello world!')
      done()
    })
  })
})