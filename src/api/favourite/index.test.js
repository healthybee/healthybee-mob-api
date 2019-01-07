import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Favourite } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, favourite

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  favourite = await Favourite.create({ user })
})

test('POST /favourites 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(typeof body.user).toEqual('object')
})

test('POST /favourites 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /favourites 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /favourites 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /favourites/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${favourite.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(favourite.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /favourites/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${favourite.id}`)
  expect(status).toBe(401)
})

test('GET /favourites/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /favourites/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${favourite.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(favourite.id)
  expect(typeof body.user).toEqual('object')
})

test('PUT /favourites/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${favourite.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('PUT /favourites/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${favourite.id}`)
  expect(status).toBe(401)
})

test('PUT /favourites/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession })
  expect(status).toBe(404)
})

test('DELETE /favourites/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${favourite.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /favourites/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${favourite.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /favourites/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${favourite.id}`)
  expect(status).toBe(401)
})

test('DELETE /favourites/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
