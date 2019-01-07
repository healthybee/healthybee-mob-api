import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Favourite } from '.'

export const create = ({ user, body }, res, next) =>
  Favourite.create({ ...body, user })
    .then((favourite) => favourite.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Favourite.find(query, select, cursor)
    .populate('user')
    .then((favourites) => favourites.map((favourite) => favourite.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Favourite.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((favourite) => favourite ? favourite.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, body, params }, res, next) =>
  Favourite.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((favourite) => favourite ? Object.assign(favourite, body).save() : null)
    .then((favourite) => favourite ? favourite.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Favourite.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((favourite) => favourite ? favourite.remove() : null)
    .then(success(res, 204))
    .catch(next)
