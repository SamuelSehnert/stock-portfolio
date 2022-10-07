const portfolioFunctions = require('./portfolio.js');

var startingPortfolio;

beforeEach(() => {
  startingPortfolio = portfolioFunctions.createStockPortfolio();
});

test('Init stock portfolio and check if empty -- PASS', () => {
  const target = {};
  expect(target).toEqual(startingPortfolio);
});

test('Check if portfolio is empty -- PASS', () => {
  const result = portfolioFunctions.isPortfolioEmpty(startingPortfolio);
  expect(result).toBeTruthy();
});

test('Check if portfolio is empty -- FAIL', () => {
  startingPortfolio["TICKER"] = 1;
  const result = portfolioFunctions.isPortfolioEmpty(startingPortfolio);
  expect(result).toBeFalsy();
});

test('Check number of unique tickers of empty portfolio', () => {
  const target = 0;
  expect(target).toEqual(portfolioFunctions.countUniqueTickers(startingPortfolio));
});

test('Check number of unique tickers', () => {
  startingPortfolio['FIRST'] = 8;
  startingPortfolio['NEXT'] = 10;
  startingPortfolio['THIRD'] = 15;
  const target = 3;
  expect(target).toEqual(portfolioFunctions.countUniqueTickers(startingPortfolio));
});

test('Add symbol and number of shares to empty portfolio', () => {
  const target = {
    "GME" : 10
  };
  startingPortfolio = portfolioFunctions.addShares(startingPortfolio, "GME", 10);
  expect(target).toEqual(startingPortfolio);
});

test('Add multiple symbol and number of shares to empty portfolio', () => {
  const target = {
    "GME" : 10,
    "TEST": 1000
  };
  startingPortfolio = portfolioFunctions.addShares(startingPortfolio, "GME", 10);
  startingPortfolio = portfolioFunctions.addShares(startingPortfolio, "TEST", 1000);
  expect(target).toEqual(startingPortfolio);
});

test('Add symbol and number of shares to non-empty portfolio', () => {
  const target = {
    "GME" : 15
  };
  startingPortfolio = portfolioFunctions.addShares(startingPortfolio, "GME", 10);
  startingPortfolio = portfolioFunctions.addShares(startingPortfolio, "GME", 5);
  expect(target).toEqual(startingPortfolio);
});

test('Subtract number of shares from empty portfolio', () => {
  const target = {};
  startingPortfolio = portfolioFunctions.removeShares(startingPortfolio, "GME", 5);
  expect(target).toEqual(startingPortfolio);
});

test('Subtract number of shares from valid portfolio', () => {
  const target = {
    "GME" : 5
  };
  startingPortfolio = portfolioFunctions.addShares(startingPortfolio, "GME", 20);
  startingPortfolio = portfolioFunctions.removeShares(startingPortfolio, "GME", 15);
  expect(target).toEqual(startingPortfolio);
});

test('Subtract exact number of owned shares from valid portfolio', () => {
  const target = {
    'CSCO' : 100
  };
  startingPortfolio = portfolioFunctions.addShares(startingPortfolio, "GME", 20);
  startingPortfolio = portfolioFunctions.addShares(startingPortfolio, "CSCO", 100);
  startingPortfolio = portfolioFunctions.removeShares(startingPortfolio, "GME", 20);
  expect(target).toEqual(startingPortfolio);
});

test('Subtract too many shares from valid portfolio -> ERROR', () => {
  startingPortfolio = portfolioFunctions.addShares(startingPortfolio, "GME", 20);
  expect(() => 
    portfolioFunctions.removeShares(startingPortfolio, "GME", 100)
  ).toThrowError("Attempting to sell more shares than owned");
});

test('Check number of shares for non-existing stock', () => {
  const target = 0;
  const result = portfolioFunctions.checkShares(startingPortfolio, "GME");
  expect(target).toEqual(result);
});

test('Check number of shares for existing stock', () => {
  const target = 20;
  startingPortfolio = portfolioFunctions.addShares(startingPortfolio, "GME", 20);
  const result = portfolioFunctions.checkShares(startingPortfolio, "GME");
  expect(target).toEqual(result);
});
