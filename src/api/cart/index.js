import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export Cart, { schema } from './model'

const router = new Router()

/**
 * @api {post} /carts Create cart
 * @apiName CreateCart
 * @apiGroup Cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  create)

/**
 * @api {get} /carts Retrieve carts
 * @apiName RetrieveCarts
 * @apiGroup Cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of carts.
 * @apiSuccess {Object[]} rows List of carts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /carts/:id Retrieve cart
 * @apiName RetrieveCart
 * @apiGroup Cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /carts/:id Update cart
 * @apiName UpdateCart
 * @apiGroup Cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  update)

/**
 * @api {delete} /carts/:id Delete cart
 * @apiName DeleteCart
 * @apiGroup Cart
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Cart not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
