import { DeliverySupport } from '.'

let deliverySupport

beforeEach(async () => {
  deliverySupport = await DeliverySupport.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = deliverySupport.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(deliverySupport.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = deliverySupport.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(deliverySupport.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
