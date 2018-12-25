import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export Address, { schema } from './model'

const router = new Router()

/**
 * @api {post} /addresses Create address
 * @apiName CreateAddress
 * @apiGroup Address
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} address Address's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Address not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  create)

/**
 * @api {get} /addresses Retrieve addresses
 * @apiName RetrieveAddresses
 * @apiGroup Address
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} addresses List of addresses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /addresses/:id Retrieve address
 * @apiName RetrieveAddress
 * @apiGroup Address
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} address Address's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Address not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /addresses/:id Update address
 * @apiName UpdateAddress
 * @apiGroup Address
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} address Address's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Address not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  update)

/**
 * @api {delete} /addresses/:id Delete address
 * @apiName DeleteAddress
 * @apiGroup Address
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Address not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
