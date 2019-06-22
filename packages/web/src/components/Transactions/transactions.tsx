import * as React from 'react';
import { CoreService } from '@stock-bot/modules';

import './_transactions.scss';

const coreService = new CoreService();

export default class Transactions extends React.Component {
  readonly state: any;

  constructor(props: any) {
    super(props);

    this.state = {
      orders: [],
    }
  }

  async componentDidMount() {
    let orders = await coreService.getOrders();
    console.log('orders: ', orders);
    this.setState({orders})
  }

  getOrders = () => {
    let orders = this.state.orders;

    if(!orders.length) return orders;

    return orders.map((o: any) => {
      return (
        <div key={o.id} className="transactions__order">
          <span className='transactions__order__symbol'>{o.symbol}</span>
          <span className={`transactions__order__side status--${o.status}`}>{o.side}</span>
          <span className='transactions__order__price'>{o.stop_price}</span>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="transactions">
        <div className="transactions__header">Orders</div>
        <div className="transactions__orders">{this.getOrders()}</div>
      </div> 
    )
  }
}