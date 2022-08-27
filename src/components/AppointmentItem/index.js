// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {item, starappointment} = props
  const {id, title, date, isstarred} = item

  const imgUrl = isstarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const changestarstatus = () => {
    starappointment(id)
  }

  return (
    <li className="appointment-item-card">
      <div className="appointment-item-content">
        <p className="appointment-item-title">{title}</p>
        <p className="appointment-item-date">{`Date: ${date}`}</p>
      </div>
      <button
        className="star-button"
        testid="star"
        type="button"
        onClick={changestarstatus}
      >
        <img src={imgUrl} alt="star" className="star-image" />
      </button>
    </li>
  )
}

export default AppointmentItem
