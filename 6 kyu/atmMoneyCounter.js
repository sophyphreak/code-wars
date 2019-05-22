// VALUES is the cash register
VALUES = { "EUR": [5, 10, 20, 50, 100, 200, 500], "USD": [1, 2, 5, 10, 20, 50, 100], "RUB": [10, 50, 100, 500, 1000, 5000], "UAH": [1, 2, 5, 10, 50, 100, 500], "CUP": [4, 6, 7, 10, 15], "SOS": [1000, 2234, 3423]};

const atm = value => {
  const {
    currency, amount
  } = getCurrencyAndAmount(value);
  if (!VALUES.hasOwnProperty(currency)) {
    return `Sorry, have no ${currency}.`;
  }
  if (amount % VALUES[currency][0] !== 0) {
    return `Can\'t do ${amount} ${currency}. Value must be divisible by ${VALUES[currency][0]}!`;
  }
  const noteAmounts = getNoteAmounts(currency, amount);
  return getCashString(noteAmounts, currency);
};

const getCurrencyAndAmount = value => {
  let currency = '';
  let amount = '';
  for (let char of value) {
    if (/[A-Za-z]/.test(char)) {
      currency += char;
    }
    if (/[0-9]/.test(char)) {
      amount += char;
    }
  }
  currency = currency.toUpperCase();
  amount = parseInt(amount);
  return { currency, amount };
}

const getNoteAmounts = (currency, amount) => {
  const cashAmounts = {};
  let currentIndex = VALUES[currency].length - 1; // current index of denominations, starts at largest
  while (amount > 0) {
    if (currentIndex < 0) {
      throw 'currentIndex is below 0. should not be possible, dude!';
    }
    const currentDemonination = VALUES[currency][currentIndex];
    if (currentDemonination <= amount) {
      amount -= currentDemonination;
      if (!cashAmounts.hasOwnProperty(currentDemonination)) {
        cashAmounts[currentDemonination] = 1;
      } else {
        cashAmounts[currentDemonination]++;
      }
    } else {
      currentIndex--;
    }
  };
  if (amount < 0) {
    throw 'amount is below 0. should not be possible, dude!';
  }
  return cashAmounts;
}

const getCashString = (noteAmounts, currency) => {
  let result = '';
  const noteList = Object.keys(noteAmounts);
  noteList.reverse();
  for (let note of noteList) {
    result += `${noteAmounts[note]} * ${note} ${currency}, `;
  }
  result = result.slice(0, result.length - 2);
  return result;
};

const assert = require('assert');

assert.deepEqual(getCurrencyAndAmount('XSF 1000'), { currency: 'XSF', amount: 1000 });
assert.deepEqual(getCurrencyAndAmount('rub 12341'), { currency: 'RUB', amount: 12341 });
assert.deepEqual(getCurrencyAndAmount('10202UAH'), { currency: 'UAH', amount: 10202});
assert.deepEqual(getCurrencyAndAmount('842 usd'), { currency: 'USD', amount: 842 });
assert.deepEqual(getCurrencyAndAmount('euR1000'), { currency: 'EUR', amount: 1000 });
assert.deepEqual(getCurrencyAndAmount('sos100'), { currency: 'SOS', amount: 100 });
assert.deepEqual(getNoteAmounts('UAH', 10202), { 500: 20, 100: 2, 2: 1 }, 'UAH getNoteAmounts test');
assert.deepEqual(getNoteAmounts('USD', 842), { 100: 8, 20: 2, 2: 1 }, 'USD getNoteAmounts test');
assert.deepEqual(getNoteAmounts('EUR', 1000), { 500: 2 }, 'EUR getNoteAmounts test');
assert.equal(atm('XSF 1000'), 'Sorry, have no XSF.');
assert.equal(atm('rub 12341'), 'Can\'t do 12341 RUB. Value must be divisible by 10!');
assert.equal(atm('sos100'), 'Can\'t do 100 SOS. Value must be divisible by 1000!');
assert.equal(atm('10202UAH'), '20 * 500 UAH, 2 * 100 UAH, 1 * 2 UAH');
assert.equal(atm('842 usd'), '8 * 100 USD, 2 * 20 USD, 1 * 2 USD');
assert.equal(atm('euR1000'), '2 * 500 EUR');
