import { CancelPolicy } from '.'

let cancelPolicy

beforeEach(async () => {
  cancelPolicy = await CancelPolicy.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cancelPolicy.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cancelPolicy.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cancelPolicy.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cancelPolicy.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
