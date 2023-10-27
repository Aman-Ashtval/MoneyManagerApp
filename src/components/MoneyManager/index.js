import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expense: 0,
    transactionList: [],
    title: '',
    amount: 0,
    type: 'Income',
  }

  addTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      balance:
        type === 'Income'
          ? prevState.balance + parseInt(amount)
          : prevState.balance - parseInt(amount),
      income:
        type === 'Income'
          ? prevState.income + parseInt(amount)
          : prevState.income + 0,
      expense:
        type === 'Expenses'
          ? prevState.expense + parseInt(amount)
          : prevState.expense + 0,
    }))

    document.getElementById('title').value = ''
    document.getElementById('amount').value = ''
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onDelete = (id, amount, type) => {
    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(
        eachTrasaction => eachTrasaction.id !== id,
      ),
      balance:
        type === 'Income'
          ? prevState.balance - parseInt(amount)
          : prevState.balance + parseInt(amount),
      income:
        type === 'Income'
          ? prevState.income - parseInt(amount)
          : prevState.income - 0,
      expense:
        type === 'Expenses'
          ? prevState.expense - parseInt(amount)
          : prevState.expense - 0,
    }))
  }

  render() {
    const {balance, income, expense, transactionList} = this.state
    const moneyDetails = [
      {
        id: uuidv4(),
        title: 'Your Balance',
        amount: balance,
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
        altText: 'balance',
      },
      {
        id: uuidv4(),
        title: 'Your Income',
        amount: income,
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png ',
        altText: 'income',
      },
      {
        id: uuidv4(),
        title: 'Your Expenses',
        amount: expense,
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png ',
        altText: 'expenses',
      },
    ]
    return (
      <div className="bg-container">
        <div className="header">
          <h1 className="header-h1">Hi, Richard</h1>
          <p className="header-p">
            Welcome back to your
            <span className="text-blue"> Money Manager</span>
          </p>
        </div>
        <ul className="money-details-list">
          {moneyDetails.map(each => (
            <MoneyDetails acountDetails={each} key={each.id} />
          ))}
        </ul>
        <div className="activity-container">
          <div className="transaction-container">
            <h1 className="transaction-h1">Add Transaction</h1>
            <form className="form" onSubmit={this.addTransaction}>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                className="input"
                id="title"
                placeholder="TITLE"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <input
                type="text"
                className="input"
                id="amount"
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
              />
              <label htmlFor="typeSelect" className="label">
                AMOUNT
              </label>
              <select
                id="type-Select"
                className="input"
                onChange={this.onChangeType}
              >
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
              <button type="submit" className="btn">
                Add
              </button>
            </form>
          </div>
          <div className="history-container">
            <h1 className="transaction-h1">History</h1>
            <div className="history-list-item">
              <p className="li-h1">Title</p>
              <p className="li-h1">Amount</p>
              <p className="li-h1">Type</p>
            </div>
            <ul className="history-list">
              {transactionList.map(each => (
                <TransactionItem
                  transactionDetails={each}
                  key={each.id}
                  transactionTypeOptions={transactionTypeOptions}
                  onDelete={this.onDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
