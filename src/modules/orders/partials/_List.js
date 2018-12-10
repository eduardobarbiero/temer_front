import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationSystem from 'react-notification-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OrdersController from 'store/controllers/OrdersController';
import { DeleteNotification } from 'components/notifier/DeleteNotification';
import { formatCurrency } from 'components/common/Functions';

// Componente partial da listagem do pedido
export default class _List extends React.Component {

    constructor(props) {
        super(props);
    }

    // Notificação na ação de exclusão do pedido
    exclude(orderId) {
        this.notificationSystem.addNotification({
            level: 'warning',
            position: 'tc',
            children: (
                <div>
                    <DeleteNotification
                        text={'Deseja realmente excluir o Pedido?'}
                        apply={
                            () => {
                                OrdersController.delete(orderId).then(
                                    () => {
                                        this.notificationSystem.addNotification({
                                            message: 'Pedido excluido com sucesso!',
                                            level: 'success'
                                        });
                                        this.props.getOrders();
                                    }), () => this.notificationSystem.addNotification({
                                        message: 'Não foi possível excluir o Pedido!',
                                        level: 'error'
                                    });
                            }
                        }
                        reject={() => { }}
                    />
                </div>
            )
        });
    }

    // Retorna o conteúdo respectivo ao status da linha expandida dos itens do pedido
    _expandColumnComponent({ isExpandableRow, isExpanded }) {
        let content = ' ';

        if (isExpandableRow)
            content = (isExpanded ? <FontAwesomeIcon icon="sort-up" className="icon" /> : <FontAwesomeIcon icon="sort-down" className="icon" />);

        return (
            <div> {content} </div>
        );
    }

    // Tabela de itens do pedido com base em um pedido
    _expandComponent(order) {
        return (
            <BootstrapTable
                data={order.orderItems}
            >
                <TableHeaderColumn dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
                <TableHeaderColumn dataFormat={(cell, row) => <div>{row.product ? row.product.name : ''}</div>}>Produto</TableHeaderColumn>
                <TableHeaderColumn dataField="quantity">Quantidade</TableHeaderColumn>
                <TableHeaderColumn dataFormat={(cell, row) => <div>{row.price ? `R$ ${formatCurrency(row.price)}` : ''}</div>}>Valor</TableHeaderColumn>
                <TableHeaderColumn dataFormat={(cell, row) => <div>{row.product ? `R$ ${formatCurrency(row.product.price)}` : ''}</div>}>Valor Produto</TableHeaderColumn>
            </BootstrapTable>
        );
    }

    render() {
        return (
            <div>
                <NotificationSystem ref={(ref) => this.notificationSystem = ref} />
                <div className="row">
                    <div className="col-md-12">
                        <BootstrapTable
                            data={this.props.orders}
                            options={{
                                noDataText: 'Sem registros',
                                expandBy: 'column'
                            }}
                            bordered={false}
                            hover
                            expandableRow={() => true}
                            expandComponent={this._expandComponent}
                            expandColumnOptions={{
                                expandColumnVisible: true,
                                expandColumnComponent: this._expandColumnComponent,
                                columnWidth: 100
                            }}>
                            <TableHeaderColumn dataField="id" isKey={true}>Id</TableHeaderColumn>
                            <TableHeaderColumn
                                dataFormat={(cell, row) => <div>{row.client ? row.client.name : ''}</div>}>
                                Cliente
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataFormat={(cell, row) => <div>{row.orderItems ? _.sumBy(row.orderItems, item => item.quantity) : ''}</div>}>
                                Produtos
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataFormat={(cell, row) => <div>R$ {row.orderItems ? formatCurrency(_.sumBy(row.orderItems, item => parseInt(item.price))) : ''}</div>}>
                                Total
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataFormat={(cell, row) => <div>R$ {row.orderItems ? formatCurrency(_.sumBy(row.orderItems, item => parseFloat(item.product.price))) : ''}</div>}>
                                Total Produtos
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                className={"pull-right"}
                                width={"180"}
                                expandable={false}
                                dataFormat={
                                    (cell, row) => {
                                        return (
                                            <div className="btn-group" role="group">
                                                <Link className="btn btn-warning ml-2" to={`/orders/${row.id}/edit`}>Editar</Link>
                                                <button className="btn btn-danger ml-2" onClick={() => this.exclude(row.id)}>Excluir</button>
                                            </div>
                                        )
                                    }
                                }
                            >
                                Ações
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>
        );
    }
}