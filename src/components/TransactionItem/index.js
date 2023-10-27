import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDelete} = props
  const {id, title, amount, type} = transactionDetails

  const deleteHistory = () => {
    onDelete(id, amount, type)
  }

  return (
    <li className="history-li">
      <p className="li-p">{title}</p>
      <p className="li-p">Rs {amount}</p>
      <p className="li-p">{type}</p>
      <button
        type="button"
        className="dlt-btn"
        data-testid="delete"
        onClick={deleteHistory}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="dlt-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
