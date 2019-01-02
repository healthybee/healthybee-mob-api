import { Address } from '.';
import { User } from '../user';

let user, address;

beforeEach(async () => {
  user = await User.create({
    email: 'a@a.com',
    password: '123456',
    mobile: '1234567890'
  });
  address = await Address.create({
    user,
    landmark: 'xyz',
    zipcode: 411033,
    state: 'maharashtra',
    city: 'pune',
    line1: 'something',
    addressType: 'Home address'
  });
});

describe('view', () => {
  it('returns simple view', () => {
    const view = address.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(address.id);
    expect(typeof view.user).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.landmark).toBeTruthy();
    expect(view.zipcode).toBeTruthy();
    expect(view.state).toBeTruthy();
    expect(view.city).toBeTruthy();
    expect(view.line1).toBeTruthy();
    expect(view.addressType).toBeTruthy();
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', () => {
    const view = address.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(address.id);
    expect(typeof view.user).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.landmark).toBeTruthy();
    expect(view.zipcode).toBeTruthy();
    expect(view.state).toBeTruthy();
    expect(view.city).toBeTruthy();
    expect(view.line1).toBeTruthy();
    expect(view.addressType).toBeTruthy();
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
