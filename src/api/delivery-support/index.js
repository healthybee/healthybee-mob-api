import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export DeliverySupport, { schema } from './model'

const router = new Router()

/**
 * @api {post} /delivery-supports Create delivery support
 * @apiName CreateDeliverySupport
 * @apiGroup DeliverySupport
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} deliverySupport Delivery support's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Delivery support not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  create)

/**
 * @api {get} /delivery-supports Retrieve delivery supports
 * @apiName RetrieveDeliverySupports
 * @apiGroup DeliverySupport
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} deliverySupports List of delivery supports.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /delivery-supports/:id Retrieve delivery support
 * @apiName RetrieveDeliverySupport
 * @apiGroup DeliverySupport
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} deliverySupport Delivery support's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Delivery support not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /delivery-supports/:id Update delivery support
 * @apiName UpdateDeliverySupport
 * @apiGroup DeliverySupport
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} deliverySupport Delivery support's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Delivery support not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  update)

/**
 * @api {delete} /delivery-supports/:id Delete delivery support
 * @apiName DeleteDeliverySupport
 * @apiGroup DeliverySupport
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Delivery support not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
