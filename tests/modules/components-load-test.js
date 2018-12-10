const expect = require('expect');
const Orders = require('../../src/modules/orders/Orders');
const Order = require('../../src/modules/orders/Order');
const _List = require('../../src/modules/orders/partials/_List');
const _OrderItem = require('../../src/modules/orders/partials/_OrderItem');

describe('orders', () => {
  it('renders orders component without problems', () => {        
    expect(Orders).toBeTruthy();
  });

  it('renders order component without problems', () => {        
    expect(Order).toBeTruthy();
  });

  it('renders list component partial without problems', () => {        
    expect(_List).toBeTruthy();
  });

  it('renders order item component partial without problems', () => {        
    expect(_OrderItem).toBeTruthy();
  });
});