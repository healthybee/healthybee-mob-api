import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export Favourite, { schema } from './model'

const router = new Router()

/**
 * @api {post} /favourites Create favourite
 * @apiName CreateFavourite
 * @apiGroup Favourite
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} favourite Favourite's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favourite not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  create)

/**
 * @api {get} /favourites Retrieve favourites
 * @apiName RetrieveFavourites
 * @apiGroup Favourite
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} favourites List of favourites.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /favourites/:id Retrieve favourite
 * @apiName RetrieveFavourite
 * @apiGroup Favourite
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} favourite Favourite's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favourite not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /favourites/:id Update favourite
 * @apiName UpdateFavourite
 * @apiGroup Favourite
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} favourite Favourite's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favourite not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  update)

/**
 * @api {delete} /favourites/:id Delete favourite
 * @apiName DeleteFavourite
 * @apiGroup Favourite
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Favourite not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
