import * as React from 'react';
import { CoreService } from '@stock-bot/modules';

import './_transactions.scss';

const coreService = new CoreService();

export default class Transactions extends React.Component {
  readonly state: any;
  interval: any;

  constructor(props: any) {
    super(props);

    this.state = {
      orders: [],
      isLoading: false
    }
  }

  async componentDidMount() {
    this.interval = setInterval(this.getOrders, 1000);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  getOrders = async () => {
    if(this.state.isLoading) return;
    this.setState({ isLoading: true }, async () => {
      let orders: any = await coreService.getOrders({status: 'all'});

      if(!orders.length) return orders;
  
      orders =  orders.map((o: any) => {
        return (
          <div key={o.id} className="transactions__order">
            <span className='transactions__order__symbol'>{o.symbol}</span>
            <span className={`transactions__order__side status--${o.status}`}>{o.side}</span>
            <span className='transactions__order__price'>{o.stop_price}</span>
          </div>
        )
      });
      
      this.setState({ orders, isLoading: false });
    });
  }

  render() {
    const { orders } = this.state;

    return (
      <div className="transactions">
        <div className="transactions__header">Orders</div>
        <div className="transactions__orders">{orders}</div>
      </div> 
    )
  }
}