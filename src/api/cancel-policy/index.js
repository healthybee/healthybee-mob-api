import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export CancelPolicy, { schema } from './model'

const router = new Router()

/**
 * @api {post} /cancel-policies Create cancel policy
 * @apiName CreateCancelPolicy
 * @apiGroup CancelPolicy
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} cancelPolicy Cancel policy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cancel policy not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  create)

/**
 * @api {get} /cancel-policies Retrieve cancel policies
 * @apiName RetrieveCancelPolicies
 * @apiGroup CancelPolicy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} cancelPolicies List of cancel policies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /cancel-policies/:id Retrieve cancel policy
 * @apiName RetrieveCancelPolicy
 * @apiGroup CancelPolicy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} cancelPolicy Cancel policy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cancel policy not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /cancel-policies/:id Update cancel policy
 * @apiName UpdateCancelPolicy
 * @apiGroup CancelPolicy
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} cancelPolicy Cancel policy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cancel policy not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  update)

/**
 * @api {delete} /cancel-policies/:id Delete cancel policy
 * @apiName DeleteCancelPolicy
 * @apiGroup CancelPolicy
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Cancel policy not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
