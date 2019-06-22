import * as React from 'react';

import './_symbol-card.scss';

type SymbolCardProps = {
  symbol: string,
  changePercent: number
}

export default class SymbolCard extends React.Component<SymbolCardProps, any> {
  render() {
    const { symbol, changePercent } = this.props;
    const changeClass = changePercent <= 0 ? '--negative' : '';

    return (
      <div className="symbol-card">
        <span className="symbol-card__symbol">{symbol.toUpperCase()} </span>
        <span className={"symbol-card__change" + changeClass}>{changePercent}%</span>
      </div>
    )
  }
}