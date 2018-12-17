import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timeline from './component/Timeline'
import axios from 'axios'
const _ = require('lodash')

class App extends Component {
  state = {}

  componentDidMount() {
    axios.get("https://storage.googleapis.com/dito-questions/events.json").then(res => {
      if (res.data && res.data.events) {
        let compras = _.filter(res.data.events, { event: "comprou" });

        let compra_produto = _.filter(res.data.events, { event: "comprou-produto" });
        compra_produto = compra_produto.map(o => {
          let transaction = o.custom_data.filter(o => o.key === "transaction_id")[0].value
          let produto_nome = o.custom_data.filter(o => o.key === "product_name")[0].value
          let produto_preco = o.custom_data.filter(o => o.key === "product_price")[0].value

          return {
            produto_nome: produto_nome,
            transaction: transaction,
            produto_preco: produto_preco,
            timestamp: o.timestamp
          };
        })
        
        compras = compras.map(o => {
          let transaction = o.custom_data.filter(o => o.key === "transaction_id")[0].value
          let loja = o.custom_data.filter(o => o.key === "store_name")[0].value
          let produtos = _.filter(compra_produto, { transaction })

          return {
            loja: loja,
            transaction: transaction,
            produtos,
            timestamp: o.timestamp,
            preco_total: o.revenue
          };
        })
        compras = _.orderBy(compras, ['timestamp'], ['desc']);
        console.log("compras", compras)
        this.setState({ compras })
      }
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <section >
          <h2>Componente timeline de compras:</h2>
          <article>
            {this.state.compras &&
              <Timeline data={this.state.compras} />
            }
          </article>
        </section>


      </div>
    );
  }
}

export default App;
