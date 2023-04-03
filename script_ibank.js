'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2022-10-02T14:43:31.074Z',
    '2022-10-29T11:24:19.761Z',
    '2022-11-15T10:45:23.907Z',
    '2023-01-22T12:17:46.255Z',
    '2023-02-12T15:14:06.486Z',
    '2023-03-30T11:42:26.371Z',
    '2023-04-01T07:43:59.331Z',
    '2023-04-02T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2022-10-02T14:43:31.074Z',
    '2022-10-29T11:24:19.761Z',
    '2022-11-15T10:45:23.907Z',
    '2022-01-22T12:17:46.255Z',
    '2022-02-12T15:14:06.486Z',
    '2022-03-09T11:42:26.371Z',
    '2022-05-21T07:43:59.331Z',
    '2022-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2022-10-02T14:43:31.074Z',
    '2022-10-29T11:24:19.761Z',
    '2022-11-15T10:45:23.907Z',
    '2022-01-22T12:17:46.255Z',
    '2022-02-12T15:14:06.486Z',
    '2022-03-09T11:42:26.371Z',
    '2022-05-21T07:43:59.331Z',
    '2022-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2022-10-02T14:43:31.074Z',
    '2022-10-29T11:24:19.761Z',
    '2022-11-15T10:45:23.907Z',
    '2022-01-22T12:17:46.255Z',
    '2022-02-12T15:14:06.486Z',
  ],
  currency: 'CAD',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2022-10-02T14:43:31.074Z',
    '2022-10-29T11:24:19.761Z',
    '2022-11-15T10:45:23.907Z',
    '2022-01-22T12:17:46.255Z',
    '2022-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Functions
//========================================================
const createNicknames = accounts => {
  accounts.forEach(account => {
    account.nickname = account.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
  return;
};
//========================================================
const formatTransactionDAte = (date, locale) => {
  const getDAysBetween2Dates = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const daysPassed = getDAysBetween2Dates(new Date(), date);

  if (daysPassed === 0) return 'Сегодня';
  if (daysPassed === 1) return 'Вчера';
  if (daysPassed <= 5) return `${daysPassed} дня назад`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};
//========================================================
const formatCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value.toFixed(2));
};
//========================================================
const displayTransaction = (account, sort = false) => {
  containerTransactions.innerHTML = '';
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  inputLoanAmount.value = '';

  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach((transaction, index) => {
    const transitionType = transaction > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.transactionsDates[index]);

    const transactionDate = formatTransactionDAte(date, account.locale);

    const transactionFormat = formatCurrency(
      transaction,
      account.locale,
      account.currency
    );

    const transactionRow = `<div class="transactions__row">
          <div class="transactions__type transactions__type--${transitionType}">${
      index + 1
    } ${transitionType}</div>
      <div class="transactions__date">${transactionDate}</div>
          <div class="transactions__value">${transactionFormat}</div>
        </div>`;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};
//========================================================
const displayBalans = account => {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  const balanceFormat = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
  labelBalance.textContent = balanceFormat;
};
//========================================================
const displayTotal = account => {
  const depositesTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);

  const totalFormat = formatCurrency(
    depositesTotal,
    account.locale,
    account.currency
  );
  labelSumIn.textContent = totalFormat;

  const withdrawalsTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  const withdrawalsTotalFormat = formatCurrency(
    withdrawalsTotal,
    account.locale,
    account.currency
  );
  labelSumOut.textContent = withdrawalsTotalFormat;

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter(interest => interest >= 5)
    .reduce((acc, depos) => acc + depos, 0);

  const interestTotalFormat = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
  labelSumInterest.textContent = interestTotalFormat;
};
//========================================================
const updateUI = currentAccount => {
  // Display transactions
  displayTransaction(currentAccount);
  // Display ballans
  displayBalans(currentAccount);
  // Display total
  displayTotal(currentAccount);
  [...document.querySelectorAll('.transactions__row')].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = '#ddd7d7';
    }
  });
};
//========================================================
const startLogoutTimer = () => {
  const logoutTimerCallback = () => {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const second = String(time % 60).padStart(2, '0');
    // show time in UI
    labelTimer.textContent = `${minutes}:${second}`;

    // after the time expires, stop the timer and exit the application
    if (time === 0) {
      clearInterval(logoutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }
    time--;
  };
  // setting exit time after 5 minutes
  let time = 300;
  logoutTimerCallback();
  //by calling the timer every second
  const logoutTimer = setInterval(logoutTimerCallback, 1000);
  return logoutTimer;
};
//========================================================

// Actions in the app
createNicknames(accounts);

let currentAccount;
let currentLogoutTimer;

// User Login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI & welcom message
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Hello, ${
      currentAccount.userName.split(' ')[0]
    }!`;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    // checking if timer exists
    if (currentLogoutTimer) clearInterval(currentLogoutTimer);
    currentLogoutTimer = startLogoutTimer();
    updateUI(currentAccount);
  }
});

// transit of money
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickname === recipientNickname
  );
  if (
    transferAmount > 0 &&
    transferAmount <= currentAccount.balance &&
    recipientAccount?.nickname !== currentAccount.nickname
  ) {
    // Add transaction
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    // Add ransactions date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
  // restart timer
  clearInterval(currentLogoutTimer);
  currentLogoutTimer = startLogoutTimer();
  // Clear inputs
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
});

// Get money
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanAmount = Math.round(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.transactions
      .filter(trans => trans > 0)
      .some(trans => trans > loanAmount * 0.1)
  ) {
    setTimeout(function () {
      // Add transaction
      currentAccount.transactions.push(loanAmount);
      // Add ransactions date
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 5000);
  }
  // restart timer
  clearInterval(currentLogoutTimer);
  currentLogoutTimer = startLogoutTimer();
  inputLoanAmount.value = '';
});

// Sorted transactions
let transactionsSorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayTransaction(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});

// Delete account
btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    currentAccount.nickname === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    );
    accounts.splice(currentAccountIndex, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = '';
    inputClosePin.value = '';
    labelWelcome.textContent = 'Войдите в свой аккаунт';
  }
});
