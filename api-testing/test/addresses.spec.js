const req = require('supertest');
const { getAccessToken } = require('../utils/request');
const API_URL = process.env.API_URL

describe('Address and Customer', () => {
    let token
    let addressId
    let customerId
    beforeAll(async () => {
        token = await getAccessToken('admin', 'admin')
    })
    it('(HC) POST addresses', async () => {

        await req(API_URL)
            .post('/addresses')
            .send({
                "address_1": "Rua Qualquer Coisa",
                "address_2": "12",
                "city": "Campinas",
                "state": "São Paulo",
                "zip": 13555999
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(201)
                expect(response.body.city).toBe("Campinas")
                return addressId = response.body.id
            })
    });
    it('(HC) GET addresses', async () => {

        await req(API_URL)
            .get('/addresses')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body).toBeInstanceOf(Array)
            })
    });
    it('(HC) GET addresses/id', async () => {

        await req(API_URL)
            .get(`/addresses/${addressId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.state).toBe("São Paulo")
            })
    });
    it('(HC) PATCH addresses/id', async () => {

        await req(API_URL)
            .patch(`/addresses/${addressId}`)
            .send({
                "address_1": "Rua Qualquer Coisa Mesmo",
                "address_2": "12",
                "city": "Valinhos",
                "state": "Bahia",
                "zip": 44444444
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.city).toBe("Valinhos")
            })
    });
    it('(HC) POST customers', async () => {

        await req(API_URL)
            .post('/customers')
            .send({
                "address": {
                    "id": `${addressId}`
                },
                "email": "teste-email@gmail.com",
                "firstName": "Email",
                "lastName": "Teste",
                "phone": "119988882222"
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(201)
                return customerId = response.body.id
            })
    });
    it('(HC) GET customers', async () => {

        await req(API_URL)
            .get('/customers')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body).toBeInstanceOf(Object)
            })
    });
    it('(HC) GET customers/id', async () => {

        await req(API_URL)
            .get(`/customers/${customerId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body).toBeInstanceOf(Object)
            })
    });
    it('(HC) PATCH customers/id', async () => {

        await req(API_URL)
            .patch(`/customers/${customerId}`)
            .send({
                "address": {
                    "id": `${addressId}`
                },
                "email": "testando-email@gmail.com",
                "firstName": "Email",
                "lastName": "Testando",
                "phone": "21955551111"
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.lastName).toBe("Testando")
            })
    });
    it('(HC) DELETE customers/id', async () => {

        await req(API_URL)
            .delete(`/customers/${customerId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
            })
    });

    it('(HC) DELETE addresses/id', async () => {

        await req(API_URL)
            .delete(`/addresses/${addressId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.city).toBe("Valinhos")
            })
    });


});