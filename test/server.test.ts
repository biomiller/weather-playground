import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
chai.use(chaiHttp);
chai.should();

describe("POST /", () => {
    it("get temps from cities happy path", (done) => {
        chai.request(app)
            .post('/tempFromCities')
            .send({ "cities": ["London", "Paris"] })
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body["London"].should.be.a('number');
                response.body["Paris"].should.be.a('number');
                done();
            });
    });

    it("get temps from cities sad path", (done) => {
        chai.request(app)
            .post('/tempFromCities')
            .send({ "cities": ["London", "test"] })
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body["London"].should.be.a('number');
                response.body["test"].should.equal(`Could not retrieve data, received error code 404`);
                done();
            });
    });
})
