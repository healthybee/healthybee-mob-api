import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, showCategories, update, destroy } from './controller'
export Menu, { schema } from './model'

const router = new Router()

/**
 * @api {post} /menus Create menu
 * @apiName CreateMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} menu Menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Menu not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  create)

/**
 * @api {get} /menus Retrieve menus
 * @apiName RetrieveMenus
 * @apiGroup Menu
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of menus.
 * @apiSuccess {Object[]} rows List of menus.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /menus/categories Retrieve menus
 * @apiName RetrieveMenusCategories
 * @apiGroup Menu
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of menus.
 * @apiSuccess {Object[]} rows List of menus.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/categories',
  token({ required: true }),
  query(),
  showCategories)
/**
 * @api {get} /menus/:id Retrieve menu
 * @apiName RetrieveMenu
 * @apiGroup Menu
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} menu Menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Menu not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /menus/:id Update menu
 * @apiName UpdateMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} menu Menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Menu not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  update)

/**
 * @api {delete} /menus/:id Delete menu
 * @apiName DeleteMenu
 * @apiGroup Menu
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Menu not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
