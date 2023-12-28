import supertest from 'supertest';
import app from '../src/main.js';
import { expect } from 'chai';

describe('Carts Router', () => {
  it('Deberia crear un carrito', async () => {
    const response = await supertest(app).post('/carts');
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body.products).to.be.an('array').that.is.empty;
  });

  it('Deberia agregar un producto al carrito', async () => {
    const productResponse = await supertest(app).post('/products').send({
      title: 'Test de producto',
      description: 'Test de descripcion',
      category: 'Test de categoria',
      stock: 10,
      price: 15000,
      code: 'TEST123',
    });

    expect(productResponse.status).to.equal(201);
    const productId = productResponse.body.id;

    const cartResponse = await supertest(app).post('/carts');
    expect(cartResponse.status).to.equal(201);
    const cartId = cartResponse.body.id;

    const addToCartResponse = await supertest(app).post(`/carts/${cartId}/product/${productId}`).send({
      quantity: 1,
    });

    expect(addToCartResponse.status).to.equal(200);
    expect(addToCartResponse.body.products).to.be.an('array').that.is.not.empty;
    expect(addToCartResponse.body.products[0].id_prod).to.equal(productId);
    expect(addToCartResponse.body.products[0].quantity).to.equal(1);
  });
});