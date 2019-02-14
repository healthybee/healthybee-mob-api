import { success, notFound } from '../../services/response/'
import { Menu } from '.'

export const create = ({ body }, res, next) =>
  Menu.create(body)
    .then((menu) => menu.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  res.set('Cache-Control', 'public, max-age=300, s-max-age=600')
  Menu.find(query, select, cursor)
    .then((menus) => menus.map((menu) => menu.view()))
    .then(success(res))
    .catch(next)
}

export const showCategories = ({ querymen: { query, select, cursor } }, res, next) => {
  res.set('Cache-Control', 'public, max-age=300, s-max-age=600')
  Menu.distinct('category')
    .then((categories) => categories.sort())
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Menu.findById(params.id)
    .then(notFound(res))
    .then((menu) => menu ? menu.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Menu.findById(params.id)
    .then(notFound(res))
    .then((menu) => menu ? Object.assign(menu, body).save() : null)
    .then((menu) => menu ? menu.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Menu.findById(params.id)
    .then(notFound(res))
    .then((menu) => menu ? menu.remove() : null)
    .then(success(res, 200))
    .catch(next)
