import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { render } from 'react-dom';

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import Layout from 'components/layout/Layout';

import Orders from "modules/orders/Orders";
import Order from "modules/orders/Order";
import Home from "modules/home/Home";

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <AppRoute exact path="/" layout={Layout} component={Home} />
            <AppRoute exact path="/orders" layout={Layout} component={Orders} />
            <AppRoute exact path="/orders/:orderId/edit" layout={Layout} component={Order} />
            <AppRoute exact path="/orders/new" layout={Layout} component={Order} />            
          </div>
        </BrowserRouter>        
      </div>

    );

  }
}

const AppRoute = ({ component: Component, layout: Layout, ...rest }) =>
  <Route
    {...rest}
    render={
      props =>
        <Layout>
          <Component {...props} />
        </Layout>
    }
  />



render(<App />, document.getElementById("index"));
