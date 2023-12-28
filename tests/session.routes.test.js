import supertest from 'supertest';
import app from '../src/main.js';
import { expect } from 'chai';

describe('Session Routes', () => {
  it('Deberia loguear a un usuario', async () => {
    const response = await supertest(app).post('/login').send({
      username: 'testuser',
      password: 'testpassword',
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('Deberia traer los detalles del usuario', async () => {
    const loginResponse = await supertest(app).post('/login').send({
      username: 'testuser',
      password: 'testpassword',
    });

    expect(loginResponse.status).to.equal(200);
    const token = loginResponse.body.token;

    const userResponse = await supertest(app)
      .get('/current')
      .set('Authorization', `Bearer ${token}`);

    expect(userResponse.status).to.equal(200);
    expect(userResponse.body).to.have.property('username');
  });
});