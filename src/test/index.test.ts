import 'dotenv/config';
import request from 'supertest';
import { server } from '../server';
import { messages } from '../constants';

const PORT = process.env.PORT || 5000;

describe("First scenario", () => {
  const option = {
    id: '',
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
  beforeAll(() => {
    server.listen(PORT, () => {})
  });
  afterAll(() => {
    server.close();
  })
  test('GET /api/users, should get empty array', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual([]);
  })
  test('POST /api/users, should created user', async () => {
    const res = await request(server).post('/api/users').send(user);
    option.id = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ ...user, id: option.id });
  })
  test('GET /api/users/id, should get user', async () => {
    const res = await request(server).get('/api/users/' + option.id);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ ...user, id: option.id });
  })
  test('PUT /api/users/id, should update user and return it', async () => {
    const res = await request(server).put('/api/users/' + option.id).send(updateUser);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ ...updateUser, id: option.id });
  })
  test('DELETE /api/users/id, should delete user, and response status 204', async () => {
    const res = await request(server).delete('/api/users/' + option.id);
    expect(res.statusCode).toBe(204);
  })
  test('GET /api/users/id, should return status 404 and message', async () => {
    const res = await request(server).delete('/api/users/' + option.id);
    expect(res.statusCode).toBe(404);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body.message).toBe(messages.userError);
  })
})

describe("Second scenario", () => {
  const option = {
    id: '',
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
  test('POST /api/users, should created user and return it', async () => {
    const res = await request(server).post('/api/users').send(user);
    option.id = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ ...user, id: option.id });
  })
  test('GET /api/users, should return array with length === 1', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual([{...user, id: option.id}]);
    expect(res.body.length).toEqual(1);
  })
  test('GET /api/users/id, should return error message "User id is not correct", when use invalid id', async () => {
    const res = await request(server).get('/api/users/' + option.id + 'w');
    expect(res.statusCode).toBe(400);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ message: messages.userInvalidUuid });
  })
  test('DELETE /api/users/id, should delete user, and response status 204', async () => {
    const res = await request(server).delete('/api/users/' + option.id);
    expect(res.statusCode).toBe(204);
  })
  test('GET /api/users/id, should return error message "User Not Found", when user deleted', async () => {
    const res = await request(server).get('/api/users/' + option.id);
    expect(res.statusCode).toBe(404);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ message: messages.userError });
  })
  test('PUT /api/users/id, should return error message "User Not Found", when use invalid id', async () => {
    const res = await request(server).put('/api/users/' + option.id).send(updateUser);
    expect(res.statusCode).toBe(404);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ message: messages.userError });
  })
})

describe("Third scenario", () => {
  const option = {
    id: '',
  }
  const exampleID = '1e2604d5-fead-420b-8cc5-6f5e4c849966';

  const user = {
      "username":"Name",
      "age": 50,
  }
  const updateUser = {
      "username":"NewName",
      "age": 10,
      "hobbies": []
  }
  test('POST /api/user, when send invalid request should return status code 404 and message "Request not valid"', async () => {
    const res = await request(server).post('/api/users').send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: messages.fieldsReqErr});
  })
  test('POST /api/users, when send invalid object should return status code 400 and message "Rout Not Found"', async () => {
    const res = await request(server).post('/api/user').send(updateUser);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: messages.routNotFound});
  })
  test('DELETE /api/users/id, when invalid id return status 404 and message "User Not Found"', async () => {
    const res = await request(server).delete('/api/users/' + exampleID);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: messages.userError});
  })
  test('POST /api/users, should created user and return it', async () => {
    const res = await request(server).post('/api/users').send(updateUser);
    option.id = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ ...updateUser, id: option.id });
  })
  test('PUT /api/users/id, when send invalid request should return status code 404 and message "Request not valid"', async () => {
    const res = await request(server).put('/api/users/' + option.id).send(user);
    expect(res.statusCode).toBe(400);
    expect(res.header['content-type']).toEqual('application/json');
    expect(res.body).toEqual({ message: messages.fieldsReqErr });
  })
  test('DELETE /api/users/id, when invalid id return status 400 and message "User id is not correct"', async () => {
    const res = await request(server).delete('/api/users/' + exampleID + 'e');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: messages.userInvalidUuid});
  })
})

