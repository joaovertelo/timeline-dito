import React, { Component } from 'react'
import { Timeline, TimelineEvent } from 'react-event-timeline'
import './Timeline.css'
import { FaShoppingBag } from 'react-icons/fa';

const moment = require('moment');

export class TimeLine extends Component {

    componentDidMount(props) {

    }

    formataData = data => {
        return moment(data).format('DD-MM-YYYY HH:mm').toString();
    };

    formataPreco = preco => preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    titulo = (data, preco, loja) =>
        <div className='flex-container' >
            <div style={{ backgroundColor: '#dddddd', color: 'grey', padding: '10px', borderRadius: '10px' }}>{this.formataData(data)}</div>
            <div style={{ padding: '10px', backgroundColor: '#DEB340', borderRadius: '10px' }}> {this.formataPreco(preco)} </div>
            <div style={{ padding: '10px' }}> {loja} </div>
        </div>;

    render() {

        return (
            <Timeline style={{ width: '600px' }}>
                {this.props.data && this.props.data.map((obj, index) =>
                    <TimelineEvent icon={<FaShoppingBag />} key={index} title={this.titulo(obj.timestamp, obj.preco_total, obj.loja)} >
                        <table>
                            <tbody>
                                <tr>
                                    <th>Produto</th>
                                    <th>Preço</th>
                                </tr>
                                {obj.produtos.map((produto, index) =>
                                    <tr key={index}>
                                        <td>{produto.produto_nome}</td>
                                        <td>{this.formataPreco(produto.produto_preco)}</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </TimelineEvent>
                )

                }
            </Timeline>
        )
    }
}

export default TimeLine
