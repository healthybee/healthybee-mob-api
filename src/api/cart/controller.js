import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Cart } from '.'

export const create = ({ user, body }, res, next) =>
  Cart.create({ ...body, user })
    .then((cart) => cart.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor }, user }, res, next) => {
  let pipeline = [
    { '$match': { 'user': user._id } },
    {
      '$lookup': {
        'from': 'menus',
        'localField': 'productId',
        'foreignField': '_id',
        'as': 'result'
      }
    }
  ]

  Cart.aggregate(pipeline)
    .then((carts) => carts.map((cart) => cart))
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Cart.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((cart) => cart ? cart.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, body, params }, res, next) =>
  Cart.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((cart) => cart ? Object.assign(cart, body).save() : null)
    .then((cart) => cart ? cart.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Cart.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((cart) => cart ? cart.remove() : null)
    .then(success(res, 200))
    .catch(next)
