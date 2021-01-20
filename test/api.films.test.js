const expect = require('chai').expect;
const request = require('supertest');

describe('Api GET response status 200', () => {
    const server = request('http://localhost:3000');
    
    it('GET /development/api/films', (done) => {
      server.get('/development/api/films')
        .expect(200,done);
     });
    
     it('GET /development/api/films/1', (done) => {
      server.get('/development/api/films')
        .expect(200,done);
     });

  });

  describe('Api POST response status 200', () => {
    const server = request('http://localhost:3000');
    
    it('POST /development/api/films', (done) => {
      server.post('/development/api/films')
        .send({
          "director": "Robert Popi",
          "episode_id": 12,
          "opening_crawl": "Expamploe",
          "producer": "William S.",
          "release_date": "Now",
          "title": "El retorno infinito",
          "people": [1, 2, 3]
      })
        .expect(200,done);
     });
  });

  describe('Api PATCH response status 200', () => {
    const server = request('http://localhost:3000');
    
    it('PATCH /development/api/films/1', (done) => {
      server.patch('/development/api/films/1')
        .send({
          "director": "Robert Popi",
          "episode_id": 12,
          "opening_crawl": "Expamploe",
          "producer": "William S.",
          "release_date": "Now",
          "title": "El retorno infinito",
          "people": [1, 2, 3]
      })
        .expect(200,done);
     });
  });