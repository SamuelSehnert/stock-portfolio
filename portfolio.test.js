const portfolioFunctions = require('./portfolio.js');

var emptyPortfolio;

beforeEach(() => {
  emptyPortfolio = portfolioFunctions.createStockPortfolio();
});

test('Init stock portfolio and check if empty', () => {
  const target = {};
  expect(target).toEqual(emptyPortfolio);
});

test('Check if portfolio is empty', () => {
  const result = portfolioFunctions.isPortfolioEmpty(emptyPortfolio);
  expect(result).toBeTruthy();
});
