import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import OrdersController from 'store/controllers/OrdersController';

import _List from 'modules/orders/partials/_List';

// Componente de listagem de pedidos
export default class Orders extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  componentWillMount() {
   this._getOrders(); 
  }

  // Busca a listagens de pedidos
  _getOrders() {
    OrdersController.index().then(orders => {      
      this.state.orders = orders;
      this.setState(this.state);
    });
  }

  render() {
    return (
      <main>
        <div className="heading">
          <h1>Pedidos</h1>
        </div>
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col">
              <Link className="btn btn-primary" to="/orders/new">Novo pedido</Link>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <_List orders={this.state.orders} getOrders={() => this._getOrders()} />
            </div>
          </div>
        </div>
      </main>
    )
  }

}