import { success, notFound } from '../../services/response/'
import { CancelPolicy } from '.'

export const create = ({ body }, res, next) =>
  CancelPolicy.create(body)
    .then((cancelPolicy) => cancelPolicy.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  CancelPolicy.find(query, select, cursor)
    .then((cancelPolicies) => cancelPolicies.map((cancelPolicy) => cancelPolicy.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  CancelPolicy.findById(params.id)
    .then(notFound(res))
    .then((cancelPolicy) => cancelPolicy ? cancelPolicy.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  CancelPolicy.findById(params.id)
    .then(notFound(res))
    .then((cancelPolicy) => cancelPolicy ? Object.assign(cancelPolicy, body).save() : null)
    .then((cancelPolicy) => cancelPolicy ? cancelPolicy.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  CancelPolicy.findById(params.id)
    .then(notFound(res))
    .then((cancelPolicy) => cancelPolicy ? cancelPolicy.remove() : null)
    .then(success(res, 200))
    .catch(next)
