const chai = require('chai');
const chaiHttp = require('chai-http');
const usersController = require('../auths/user.controller')
const teamsController = require('../teams/teams.controller')

chai.use(chaiHttp)

const app = require('../index').app
const API = require('../index').API

before((done) => {
  usersController.registerUser('alexander', 'password')
  usersController.registerUser('wladimir', 'password')
  done()
})
afterEach(async () => {
  await teamsController.cleanUpTeam()
})
describe('Suiete of test teams', () => {
  
  it('Should return the team of the given user', (done) => {

    let team = [{ name: 'Charizard' }, { name: 'Blastoise' }]
    console.error(`Server`);

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
                console.error(`Server`);
                
                console.log(res.body.team);
                
                chai.assert.equal(res.body.team.length, 2)
                chai.assert.equal(res.body.team[0].name, team[0].name)
                chai.assert.equal(res.body.team[1].name, team[1].name)
                done()
              })
          })
      })
  })

  it('Should return the pokedex number', (done) => {

    let pokemonName = 'Bulbasaur'

    chai.request(app)
      .post(API + '/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'alexander', password: 'password' })
      .end((err, res) => {
        let token = res.body.token
        chai.assert.equal(res.status, 200)

        chai.request(app)
          .post(API + '/teams/pokemons')
          .send({name: pokemonName})
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .get(API + '/teams')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                chai.assert.equal(res.status, 200)
                chai.assert.equal(res.body.trainer, 'alexander')
                chai.assert.equal(res.body.team.length, 1)
                chai.assert.equal(res.body.team[0].name, pokemonName)
                chai.assert.equal(res.body.team[0].pokedexNumber, 1)
                done()
              })
          })
      })
  })

  it('Should return the delete', (done) => {

    let team = [{ name: 'Charizard' }, { name: 'Blastoise' }, { name: 'Pikachu' }]

    chai.request(app)
      .post(API + '/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'alexander', password: 'password' })
      .end((err, res) => {
        let token = res.body.token
        chai.assert.equal(res.status, 200)

        chai.request(app)
          .put(API + '/teams')
          .send({ team: team })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .delete(API + '/teams/pokemons/1')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                chai.request(app)
                  .get(API + '/teams')
                  .set('Authorization', `JWT ${token}`)
                  .end((err, res) => {
                    chai.assert.equal(res.status, 200)
                    chai.assert.equal(res.body.trainer, 'alexander')
                    chai.assert.equal(res.body.team.length, team.length -1)
                    done()
                  })
              })
          })
      })
  })

  it('Should nott be able to add pokemon, if you already have 6', (done) => {

    let team = [
      {name: 'Charizard'},
      {name: 'Bulbasaur'},
      {name: 'Pikachu'},
      {name: 'Charmander'},
      {name: 'Otro'},
      {name: 'Bulbasaur'},
    ]

    chai.request(app)
      .post(API + '/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'alexander', password: 'password' })
      .end((err, res) => {
        let token = res.body.token
        chai.assert.equal(res.status, 200)

        chai.request(app)
          .put(API + '/teams')
          .send({ team: team })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .post(API + '/teams/pokemons')
              .send({name: 'Vibrava'})
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                chai.assert.equal(res.status, 400)
                done()
              })
          })
      })
  })

})
after((done) => {
  usersController.cleanUpUsers()
  done()
})