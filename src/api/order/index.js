import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export Order, { schema } from './model'

const router = new Router()

/**
 * @api {post} /orders Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam orderName Order's orderName.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true }),
  create)

/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} orders List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /orders/:id Retrieve order
 * @apiName RetrieveOrder
 * @apiGroup Order
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /orders/:id Update order
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam orderName Order's orderName.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true }),
  update)

/**
 * @api {delete} /orders/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
