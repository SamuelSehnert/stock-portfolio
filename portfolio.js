class ShareSaleException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const createStockPortfolio = () => {
  return {};
};

const isPortfolioEmpty = (portfolio) => {
  return Object.keys(portfolio).length === 0;
};

const countUniqueTickers = (portfolio) => {
  return Object.keys(portfolio).length;
};

const addShares = (portfolio, ticker, numberOfShares) => {
  !portfolio[ticker] ? portfolio[ticker] = numberOfShares : portfolio[ticker] += numberOfShares;
  return portfolio;
};

const removeShares = (portfolio, ticker, numberOfShares) => {
  if (!portfolio[ticker]) return portfolio;
  portfolio[ticker] -= numberOfShares;
  if (portfolio[ticker] < 0) throw new ShareSaleException("Attempting to sell more shares than owned");
  if (portfolio[ticker] === 0) delete portfolio[ticker];
  return portfolio;
};

const checkShares = (portfolio, ticker) => {
  return !portfolio[ticker] ? 0 : portfolio[ticker];
};

exports.createStockPortfolio = createStockPortfolio;
exports.isPortfolioEmpty = isPortfolioEmpty;
exports.countUniqueTickers = countUniqueTickers;
exports.addShares = addShares;
exports.removeShares = removeShares;
exports.checkShares = checkShares;
