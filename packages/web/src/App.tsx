import * as React from "react";
import './App.scss';

import { CoreService } from '@stock-bot/modules';
import SymbolCard from './components/SymbolCard/symbol-card';
import Transactions from './components/Transactions/transactions';
//@ts-ignore
import { LineChart } from 'react-chartkick';
import 'chart.js';

const coreService = new CoreService();

class App extends React.Component<any> {
  readonly state: any;
  constructor(props: any) {
    super(props);

    this.state = {
      positions: [],
      symbols: []
    }
  }

  async componentDidMount() {
    let positions = await coreService.getPositions();
    let symbols = await this.makeSymbols(positions);
    this.setState({positions, symbols});
  }

  makeSymbols = async (positions: any) => {
    let symbols = positions.map(async (p: any) => {
      let quote = await coreService.getSymbol(p.symbol);
      let change: any = (quote.changePercent * 100).toFixed(2);
      return <SymbolCard key={p.symbol} symbol={p.symbol} changePercent={change}></SymbolCard>;
    });
    return await Promise.all(symbols);
    
  }

  render() {
    const { positions, symbols } = this.state;

    return (
    <div className="app">
      <div className="header"></div>
      <div className='app-body'>
        <div className="app-body__main">
          <div className="app-body__detail">
            <div className="card__header">Detail</div>
            <div className="app-body__chart">
              <LineChart data={{"2017-05-13": 2, "2017-05-14": 5, "2017-05-15": 2, "2017-05-16": 5}} height="250px" width="90%"></LineChart>
            </div>
          </div>
          <div className="app-body__symbols">
            {positions.length && symbols.length ? symbols : null}
          </div>
        </div>
        <Transactions></Transactions>
      </div>
    </div>  
    );
  }
}


export default App;
