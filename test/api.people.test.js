const expect = require('chai').expect;
const request = require('supertest');

describe('Api GET response status 200', () => {
    const server = request('http://localhost:3000');
    
    it('GET /development/api/people', (done) => {
      server.get('/development/api/films')
        .expect(200,done);
     });
    
     it('GET /development/api/people/1', (done) => {
      server.get('/development/api/films')
        .expect(200,done);
     });

  });

  describe('Api POST response status 200', () => {
    const server = request('http://localhost:3000');
    
    it('POST /development/api/films', (done) => {
      server.post('/development/api/people')
        .send({
          
             "birth_year": "19 BBY",
              "eye_color": "Blue",
              "gender": "Male",
              "hair_color": "Blond",
              "height": "172",
              "homeworld": "https://swapi.py4e.com/api/planets/1/",
              "mass": "77",
              "name": "Luke Skywalker",
              "skin_color": "Fair",
              "created": "2014-12-09T13:50:51.644000Z",
              "edited": "2014-12-10T13:52:43.172000Z",
              "url": "https://swapi.py4e.com/api/people/1/"
      })
        .expect(200,done);
     });
  });

 