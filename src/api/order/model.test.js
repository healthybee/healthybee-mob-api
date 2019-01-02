import { Order } from '.';

let order, user;

beforeEach(async () => {
  user = await User.create({
    email: 'a@a.com',
    password: '123456',
    mobile: '1234567890'
  });

  order = await Order.create({
    user,
    orderName: 'test',
    isActive: true,
    startDate: new Date(),
    deliverySlots: '8:00 am to 10:00 am',
    total: 890,
    payment: 'done'
  });
});

describe('view', () => {
  it('returns simple view', () => {
    const view = order.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(order.id);
    expect(view.orderName).toBe(order.orderName);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', () => {
    const view = order.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(order.id);
    expect(view.orderName).toBe(order.orderName);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
