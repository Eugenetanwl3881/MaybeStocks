import * as React from "react";

function PortfolioTable(props) {
  
  const { portfolio, setPortfolio } = props;

  return (
    <>
      <div>
        <h2>Portfolio</h2>
        {portfolio.length > 0 ? (
          <PortfolioList
            portfolio={portfolio}
            setPortfolio={setPortfolio}
          />
        ) : (
          <p>No stocks yet! Buy some on the top left bar!</p>
        )}
      </div>
    </>
  );
}

function PortfolioList(props) {
  const { portfolio } = props;

  return (
    <table style={{ margin: "0 auto", width: "100%" }}>
      <thead>
        <tr>
          <th>No.</th>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Average Price</th>
          <th>Gain/Loss</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((portfolio, index) => (
          // We should specify key here to help react identify
          // what has updated
          // https://reactjs.org/docs/lists-and-keys.html#keys
          <tr key={portfolio.symbol}>
            <td>{index + 1}</td>
            <td>{portfolio.symbol}</td>
            <td>{portfolio.quantity}</td>
            <td>{portfolio.avgprice}</td>
            <td>{portfolio.gainloss}</td> 
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PortfolioTable;