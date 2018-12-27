import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Address } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, address

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456', mobile: '1234567890' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456', mobile: '1234567890' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin', mobile: '1234567890' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  address = await Address.create({ user, addressType: 'Home Address', line1: 'Dange chowk', city: 'pune', state: 'maharashtra', landmark: 'xyz', zipcode: 411033 })
})

test('POST /addresses 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(typeof body.user).toEqual('object')
})

test('POST /addresses 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /addresses 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /addresses 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /addresses/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${address.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(address.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /addresses/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${address.id}`)
  expect(status).toBe(401)
})

test('GET /addresses/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /addresses/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${address.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(address.id)
  expect(typeof body.user).toEqual('object')
})

test('PUT /addresses/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${address.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('PUT /addresses/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${address.id}`)
  expect(status).toBe(401)
})

test('PUT /addresses/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession })
  expect(status).toBe(404)
})

test('DELETE /addresses/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${address.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /addresses/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${address.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /addresses/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${address.id}`)
  expect(status).toBe(401)
})

test('DELETE /addresses/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
