const request = require("supertest");
const app = require('./../../app');


describe('gallery route', () => {
    it('should show a gallery', async () => {
        const response =  await request(app)
             .get('/gallery').send();

        console.log(response)
        expect(response.statusCode).toBe(200);
    })
})