import React from 'react';
import { FieldGroup } from 'components/forms/FieldGroup';
import { SelectGroup } from 'components/forms/SelectGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Componente Partial de Item de Pedido
export default class _OrderItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            product: {},
            profitability: 0
        };

        this.messageErrors = {
            productId: undefined,
            quantity: undefined,
            price: undefined,
            profitability: undefined
        };
    }

    // Executa ação a remoção do item do pedido
    _removeItem(e) {
        e.preventDefault();

        if (this.props.onRemove)
            this.props.onRemove();
    }    

    // Calcula o rendimento do item com base no valor do produto e no preço do item no pedido
    _calculateProfitability() {
        if (this.props.orderItem.productId && this.props.orderItem.price > 0) {
            if (this.state.product) {
                this.state.profitability = (parseFloat(this.props.orderItem.price) / parseFloat(this.state.product.price)) * 100;
                this.setState(this.state);
            }
        } else {
            this.state.profitability = 0;
            this.setState(this.state);
        }
    }

    // Faz a validação da rentabilidade com base no rendimento calculado para o produto x valor do item no pedido
    _validateProfitability() {
        if (this.state.product && this.state.product.price > 0 && parseFloat(this.props.orderItem.price) > parseFloat(this.state.product.price))
            return 0;

        if (this.state.profitability > 0) {
            if (this.state.profitability > 10)
                return 1;
            else if (this.state.profitability < 10)
                return 2;
        }

        return -1;
    }

    // Retorna a label referente ao rendimento calculado
    _showProfitability() {
        const validatedProfitability = this._validateProfitability();

        if (validatedProfitability == 0)
            return 'Ótima';
        else if (validatedProfitability == 1)
            return 'Boa';
        else if (validatedProfitability == 2)
            return 'Ruim';

        return 'Nenhuma';
    }

    // Valida se a quantidade do itens está equivalente ao multiplo permitido pelo produto
    _validQuantity() {
        if (this.state.product && this.props.orderItem.quantity > 0 && this.state.product.multiple > 0)
            return this.props.orderItem.quantity % this.state.product.multiple === 0
        return true;
    }

    componentDidMount() {
        if (this.props.orderItem.productId) {
            this.state.product = this.props.products.find(product => product.id == this.props.orderItem.productId);
            this.setState(this.state);

            this._calculateProfitability();
        }
    }

    // Faz a validação do formulário do item do pedido
    _validate() {
        if (!this.props.orderItem.productId)
            this.messageErrors.productId = 'Produto é obrigatório';
        else
            this.messageErrors.productId = undefined;

        if (!this.props.orderItem.quantity)
            this.messageErrors.quantity = 'Quantidade é obrigatório';
        else if (this.props.orderItem.quantity == 0)
            this.messageErrors.quantity = 'Quantidade deve ser maior que zero';
        else if (this.props.orderItem.quantity > 0 && !this._validQuantity())
            this.messageErrors.quantity = `Quantidade deve ser multiplo de ${this.state.product.multiple}`;
        else
            this.messageErrors.quantity = undefined;

        if (this.props.orderItem.price && !parseFloat(this.props.orderItem.price) > 0)
            this.messageErrors.price = `Valor é obrigatório e deve ser maior que zero.`;
        else
            this.messageErrors.price = undefined;

        const profitability = this._validateProfitability();        
        if (profitability == -1 || profitability == 2)
            this.messageErrors.profitability = `Rentabilidade deve ser no mínimo boa.`;
        else
            this.messageErrors.profitability = undefined;

        return !this.messageErrors.productId && !this.messageErrors.quantity && !this.messageErrors.price && !this.messageErrors.profitability;
    }

    render() {

        // Executa a validação em todo lifecycle lançado
        this._validate();

        return (

            <div className="row mt-4">
                <div className="col-3">
                    <SelectGroup
                        id="product"
                        label="Produto"
                        placeholder="Escolha um produto"
                        componentClass="select"
                        bsClass={`form-control ${this.messageErrors.productId ? 'error-validation' : ''} `}
                        value={this.props.orderItem.productId ? this.props.orderItem.productId : undefined}
                        options={this.props.products}
                        onChange={(event) => {
                            this.props.orderItem.productId = event.target.value;
                            this.state.product = this.props.products.find(product => product.id == this.props.orderItem.productId);
                            this.setState(this.state);

                            this._calculateProfitability();
                        }}
                        required={true}
                        feedbackError={this.messageErrors.productId}
                    />
                </div>
                <div className="col-2">
                    <FieldGroup
                        id="quantity"
                        type="number"
                        label="Quantidade"
                        placeholder="Digite a quantidade"
                        bsClass={`form-control ${this.messageErrors.quantity ? 'error-validation' : ''} `}
                        value={this.props.orderItem.quantity}
                        onChange={
                            (event) => {
                                this.props.orderItem.quantity = event.target.value;
                                this.setState(this.state);
                            }
                        }
                        required={true}
                        feedbackError={this.messageErrors.quantity}
                    />
                </div>
                <div className="col-3">
                    <FieldGroup
                        id="price"
                        type="text"
                        label="Valor"
                        placeholder="Digite o valor"
                        bsClass={`form-control ${this.messageErrors.price ? 'error-validation' : ''} `}
                        value={this.props.orderItem.price}
                        onChange={
                            (event) => {
                                this.props.orderItem.price = event.target.value;
                                this.setState(this.state);

                                this._calculateProfitability();
                            }
                        }
                        required={true}
                        feedbackError={this.messageErrors.price}
                    />
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label className="control-label">Rentabilidade</label>
                        <p>{this._showProfitability()}</p>
                        <FieldGroup
                        id="profitability"
                        type="hidden"                                                
                        bsClass={`form-control ${this.messageErrors.profitability ? 'error-validation' : ''} `}
                        value={this.props.orderItem.profitability}                                                
                        required={true}
                        feedbackError={this.messageErrors.profitability}
                    />
                    </div>

                </div>
                <div className="col-2 d-flex align-items-center">
                    <p>
                        <button className='btn btn-link btn-sm' onClick={(e) => this._removeItem(e)}>
                            <FontAwesomeIcon icon="trash-alt" className="icon" /> Remover
                        </button>
                    </p>
                </div>
            </div>
        );
    }
}
