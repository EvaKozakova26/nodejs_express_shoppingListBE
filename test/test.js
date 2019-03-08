var request = require('supertest');
var app = require('../app.js');

describe('Testing Shopping Lists', function() {
    describe('GET Lists', function() {
        it('should return shopping lists', function(done){
            let sList = {
                id: 1,
                createdAt: new Date()
            };
            request(app)
                .get('/api/getLists')
                .send(sList)
                .expect(200, done)
        });
    });
});