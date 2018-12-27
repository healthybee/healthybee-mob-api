import { success, notFound } from '../../services/response/'
import { DeliverySupport } from '.'

export const create = ({ body }, res, next) =>
  DeliverySupport.create(body)
    .then((deliverySupport) => deliverySupport.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  DeliverySupport.find(query, select, cursor)
    .then((deliverySupports) => deliverySupports.map((deliverySupport) => deliverySupport.view(true)))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  DeliverySupport.findById(params.id)
    .then(notFound(res))
    .then((deliverySupport) => deliverySupport ? deliverySupport.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  DeliverySupport.findById(params.id)
    .then(notFound(res))
    .then((deliverySupport) => deliverySupport ? Object.assign(deliverySupport, body).save() : null)
    .then((deliverySupport) => deliverySupport ? deliverySupport.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  DeliverySupport.findById(params.id)
    .then(notFound(res))
    .then((deliverySupport) => deliverySupport ? deliverySupport.remove() : null)
    .then(success(res, 204))
    .catch(next)
