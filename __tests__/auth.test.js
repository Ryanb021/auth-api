'use strict';

//changed it to sevral from app
const { server } = require('../src/auth/server');
const supertest = require('supertest');
const { db } = require('../src/auth/models');
const request = supertest(server);

beforeAll(async () => {
 
  await db.sync();
 
});

afterAll(async () => {
  await db.drop();
});

describe('Auth router', () => {
  xit('creates a user', async () => {
    let response = await request.post('/signup').send({
      username: 'ryanbagan21',
      password: 'peacewalker21',
      role: 'admin',
    });
    //changed it to 201 from 200
    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('ryanbagan21');

  });

  xit('logs in a user', async () => {
    let response = await request.post('/signin').auth('ryanbagan21', 'peacewalker21');
    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('ryanbagan21');

  });

  xit('fails to log in user with incorrect password', async () => {
    let response = await request.post('/signin').auth('ryanbagan21', 'deathstroke');
    expect(response.status).toEqual(403);
  },
  );

  xit('fails to log in user with incorrect username', async () => {
    let response = await request.post('/signin').auth('ninja', 'deathstroke');
    expect(response.status).toEqual(403);
  },
  );

  xit('fails to log in a user with no basic header', async () => {
    let response = await request.post('/signin');
    expect(response.status).toEqual(403);
  },
  );

});
