import React from 'react';
import { Link } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import { SelectGroup } from 'components/forms/SelectGroup';
import FormValidate from 'components/forms/FormValidate';

import OrdersController from 'store/controllers/OrdersController';
import ProductsController from 'store/controllers/ProductsController';
import ClientsController from 'store/controllers/ClientsController';
import _OrderItem from 'modules/orders/partials/_OrderItem';

// Componente de Pedidos
export default class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {
                orderItems: []
            },
            products: [],
            clients: []
        };

        this.editMode = false;
    }
    
    componentWillMount() {
        this.editMode = this.props.match.params.orderId > 0;

        this._getProducts();
        this._getClients();

        if (this.editMode)
            this._edit();
    }

    // Busca os produtos disponíveis para seleção
    _getProducts() {
        ProductsController.index().then(products => {
            this.state.products = products;
            this.setState(this.state);
        });
    }

    // Busca os clientes disponíveis para seleção
    _getClients() {
        ClientsController.index().then(clients => {
            this.state.clients = clients;
            this.setState(this.state);
        });
    }

    // Busca os valores referentes ao pedido selecionado no paramêtro
    _edit() {
        OrdersController.edit(this.props.match.params.orderId).then(order => {
            this.state.order = order;
            this.setState(this.state);
        });
    }

    // Cria pedido na API
    _create() {
        OrdersController.create(this.state.order).then(
            (state) => this.props.history.push('/orders', true)
        ), (error) => {
            this.notificationSystem.addNotification({
                message: 'Houve um problema ao criar o pedido!',
                level: 'error'
            });
        };
    }

    // Faz a atualização do pedido persistir na API
    _update() {
        OrdersController.update(this.state.order).then(
            (state) => this.props.history.push('/orders')
        ), (error) => {
            this.notificationSystem.addNotification({
                message: 'Houve um problema ao atualizar o pedido!',
                level: 'error'
            });
        };
    }

    // Adiciona o item ao pedido
    _addItem(e) {
        e.preventDefault();

        this.state.order.orderItems.push({ productId: undefined, price: undefined, quantity: undefined });
        this.setState(this.state);
    }

    render() {

        const orderItems = this.state.order.orderItems ? this.state.order.orderItems.filter(orderItem => !orderItem._destroy) : [];
        
        return (

            <FormValidate
                submit={() => {
                    if (this.editMode)
                        this._update();
                    else
                        this._create();
                }}
            >
                <NotificationSystem ref={(ref) => this.notificationSystem = ref} />
                <div className="row mt-3">
                    <div className="col">
                        <div className="row mt-3">
                            <div className="col">
                                <h1>{this.editMode ? "Atualizar" : "Adicionar"} Pedido</h1>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                <SelectGroup
                                    id="client"
                                    label="Cliente"
                                    placeholder="Escolha um cliente"
                                    componentClass="select"
                                    value={this.state.order.clientId ? this.state.order.clientId : undefined}
                                    options={this.state.clients}
                                    selected={this.state.order.client}
                                    onChange={(event) => {
                                        this.state.order.clientId = event.target.value;
                                        this.setState(this.state);
                                    }}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <h3>Itens do Pedido</h3>
                                <hr />
                                <div className="row mt-3">
                                    <div className="col">
                                        <button type="submit" className='btn btn-primary btn-md' onClick={(e) => this._addItem(e)}>Novo item</button>
                                    </div>
                                </div>
                                {
                                    orderItems.map((orderItem, index) => {
                                        return (
                                            <div key={index}>
                                                <_OrderItem
                                                    orderItem={orderItem}
                                                    products={this.state.products}
                                                    onRemove={() => {
                                                        if (orderItem.id > 0)
                                                            orderItem._destroy = true;
                                                        else
                                                            this.state.order.orderItems.splice(index, 1);
                                                        this.setState(this.state);
                                                    }}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <button type="submit" className='btn btn-success btn-md float-left'>
                                    {this.editMode ? "Atualizar" : "Adicionar"}
                                </button>
                                <Link className="btn btn-default btn-md float-right" to="/orders">Cancelar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </FormValidate>

        );
    }
}