import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { CancelPolicy } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, cancelPolicy

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456', mobile: '1234567890' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin', mobile: '1234567890' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  cancelPolicy = await CancelPolicy.create({})
})

test('POST /cancel-policies 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('POST /cancel-policies 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /cancel-policies 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /cancel-policies 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /cancel-policies 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /cancel-policies/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${cancelPolicy.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cancelPolicy.id)
})

test('GET /cancel-policies/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${cancelPolicy.id}`)
  expect(status).toBe(401)
})

test('GET /cancel-policies/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /cancel-policies/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${cancelPolicy.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cancelPolicy.id)
})

test('PUT /cancel-policies/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${cancelPolicy.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /cancel-policies/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${cancelPolicy.id}`)
  expect(status).toBe(401)
})

test('PUT /cancel-policies/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession })
  expect(status).toBe(404)
})

test('DELETE /cancel-policies/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cancelPolicy.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /cancel-policies/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cancelPolicy.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /cancel-policies/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cancelPolicy.id}`)
  expect(status).toBe(401)
})

test('DELETE /cancel-policies/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
