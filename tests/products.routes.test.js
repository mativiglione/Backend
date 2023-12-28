import supertest from 'supertest';
import app from '../src/main.js';
import { expect } from 'chai';

describe('Products Routes', () => {
    it('Deberia traer todos los productos', async () => {
      const response = await supertest(app).get('/products');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  
    it('Deberia traer un producto por su id', async () => {
      const response = await supertest(app).get('/products/1');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
    });
  
  });