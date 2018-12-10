import React, { Component } from 'react';

// Componente de Homepage
export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
            <h1>Teste para desenvolvedor na Mercos!</h1>	
            <h3>Sistema para emissão de pedidos.</h3>
        </div>
    </div>		
    )
  }

}