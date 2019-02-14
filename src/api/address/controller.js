import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Address } from '.'

export const create = ({ user, body }, res, next) =>
  Address.create({ ...body, user })
    .then(address => address.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor }, user }, res, next) =>
  Address.find({ 'user': user._id }, select, cursor)
    .populate('user')
    .then(addresses => addresses.map(address => address.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Address.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(address => (address ? address.view() : null))
    .then(success(res))
    .catch(next)

export const update = ({ user, body, params }, res, next) =>
  Address.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then(address => (address ? Object.assign(address, body).save() : null))
    .then(address => (address ? address.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Address.findById(params.id)
    .then(notFound(res))
    .then(address => (address ? address.remove() : null))
    .then(success(res, 200))
    .catch(next)
