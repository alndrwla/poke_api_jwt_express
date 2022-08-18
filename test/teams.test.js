const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp)

const app = require('../index').app
const API = require('../index').API

describe('Suiete of test teams', () => {
  it('Should return the team of the given user', (done) => {

    let team = [{ name: 'Charizard' }, { name: 'Blastoise' }]

    chai.request(app)
      .post(API + '/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'alexander', password: 'password' })
      .end((err, res) => {
        let token = res.body.token
        chai.assert.equal(res.status, 200)

        chai.request(app)
          .put(API + '/teams')
          .send({
            team: team
          })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .get(API + '/teams')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                chai.assert.equal(res.status, 200)
                chai.assert.equal(res.body.trainer, 'alexander')
                chai.assert.equal(res.body.team.length, 2)
                chai.assert.equal(res.body.team[0].name, team[0].name)
                chai.assert.equal(res.body.team[1].name, team[1].name)
                done()
              })
          })
      })
  })
})