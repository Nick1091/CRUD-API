import request from 'supertest';
import { server } from '../server';
import { messages } from '../constants';

describe("First scenario", () => {
  const option = {
    id: '',
    body: '',
  }
  const user = {
      "username":"Name",
      "age": 50,
      "hobbies": ["swimming", "football"]
  }
  const updateUser = {
      "username":"NewName",
      "age": 10,
      "hobbies": []
  }
  test('GET /api/users, should get empty array', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual([]);
  })
  test('POST /api/users, should created user', async () => {
    const res = await request(server).post('/api/users').send(user);
    const body = JSON.parse(res.text);
    option.id = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ ...user, id: option.id });
  })
  test('GET /api/users/id, should created user and response is expect an updated object', async () => {
    const res = await request(server).get('/api/users/' + option.id);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ ...user, id: option.id });
  })
  test('PUT /api/users/id, should update user', async () => {
    const res = await request(server).put('/api/users/' + option.id).send(updateUser);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ ...updateUser, id: option.id });
  })
  test('DELETE /api/users/id, should delete user, and response status 204', async () => {
    const res = await request(server).delete('/api/users/' + option.id).send(updateUser);
    expect(res.statusCode).toBe(204);
  })
  test('GET /api/users/id, should return status 404 and message', async () => {
    const res = await request(server).delete('/api/users/' + option.id);
    expect(res.statusCode).toBe(404);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.message).toBe(messages.userError);
  })
})

