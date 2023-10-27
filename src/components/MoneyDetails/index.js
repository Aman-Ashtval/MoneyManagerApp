import './index.css'

const MoneyDetails = props => {
  const {acountDetails} = props
  const {title, amount, imgUrl, altText} = acountDetails

  return (
    <li className={`money-details-item ${altText}-bg`}>
      <div className="image-container">
        <img src={imgUrl} alt={altText} className="img" />
      </div>
      <div className="text-container">
        <p className="title-h1">{title}</p>
        <p className="amount-p" data-testid={`${altText}Amount`}>
          Rs {amount}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
