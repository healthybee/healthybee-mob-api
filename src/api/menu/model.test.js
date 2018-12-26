import { Menu } from '.'

let menu

beforeEach(async () => {
  menu = await Menu.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = menu.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(menu.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = menu.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(menu.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
