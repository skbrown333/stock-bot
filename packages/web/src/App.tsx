import * as React from "react";
import './App.scss';

import { CoreService } from '@stock-bot/modules';
import SymbolCard from './components/SymbolCard/symbol-card';
import Transactions from './components/Transactions/transactions';
//@ts-ignore
import { LineChart } from 'react-chartkick';
import 'chart.js';
import Modal from "./components/Modal/modal";

const coreService = new CoreService();

class App extends React.Component<any> {
  readonly state: any;

  constructor(props: any) {
    super(props);

    this.state = {
      account: null,
      positions: [],
      symbols: [],
      showModal: false
    }
  }

  async componentDidMount() {
    this.getData();

  }

  getData = async () => {
    let account = await coreService.getAccount();
    let positions = await coreService.getPositions();
    let symbols = await this.makeSymbols(positions);
    this.setState({positions, symbols, account});
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
    const { account, positions, symbols, showModal } = this.state;

    return (
    <div className="app">
      <div className="header"></div>
      <div className='app-body'>
        <Modal 
          header="Options" 
          show={showModal} 
          handleClose={() => {
            this.setState({ showModal: false });
          }}>
          <div>hello</div>
        </Modal>
        <div className="app-body__main">
          <div className="app-body__detail">
            <div className="card__header">
              Detail
              <i 
                className="material-icons" 
                onClick={() => {
                  this.setState({showModal: true})
                }}>
                  build
              </i>
            </div>
            <div className="app-body__chart">
              {account ? <div>{account.equity}</div> : null}
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
