import { Favourite } from '.'
import { User } from '../user'

let user, favourite

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  favourite = await Favourite.create({ user })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = favourite.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(favourite.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = favourite.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(favourite.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
