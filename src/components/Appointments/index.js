// Write your code here

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {
    appointmentslist: [],
    title: '',
    date: '',
    starredfilterenabled: false,
  }

  titlechange = event => {
    this.setState({title: event.target.value})
  }

  datechange = event => {
    this.setState({date: event.target.value})
  }

  addappointment = event => {
    event.preventDefault()

    const {appointmentslist, title, date} = this.state

    const newappointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isstarred: false,
    }
    const newappointmentlist = [...appointmentslist, newappointment]

    this.setState({appointmentslist: newappointmentlist, title: '', date: ''})
  }

  starappointment = id => {
    const {appointmentslist} = this.state
    console.log(id)
    const newappointmentlist = appointmentslist.map(each => {
      if (each.id === id) {
        return {...each, isstarred: !each.isstarred}
      }
      return each
    })
    this.setState({appointmentslist: newappointmentlist})
  }

  showstarredappointments = () => {
    this.setState(prevstate =>
      this.setState({starredfilterenabled: !prevstate.starredfilterenabled}),
    )
  }

  render() {
    const {appointmentslist, starredfilterenabled, title, date} = this.state
    const starredbuttonclass = starredfilterenabled
      ? `starred-button filterenabled`
      : 'starred-button'

    const searchlist = starredfilterenabled
      ? appointmentslist.filter(each => each.isstarred === true)
      : appointmentslist

    return (
      <div className="bg-container">
        <div className="appointments-card">
          <div className="appointments-input-section">
            <div className="appointment-input-content-section">
              <h1 className="heading">Add Appointment</h1>
              <form className="appointment-form" onSubmit={this.addappointment}>
                <label htmlFor="appointment-title" className="title-label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="appointment-title"
                  placeholder="Title"
                  className="title-input"
                  onChange={this.titlechange}
                  value={title}
                />
                <label htmlFor="appointment-date" className="date_label">
                  DATE
                </label>
                <input
                  type="date"
                  id="appointment-date"
                  placeholder="dd/mm/yyyy"
                  className="date-input"
                  onChange={this.datechange}
                  value={date}
                />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr />
          <div className="appointment-display-section">
            <div className="appointments-content-section">
              <h1 className="heading-display">Appointments</h1>
              <button
                className={starredbuttonclass}
                type="button"
                onClick={this.showstarredappointments}
              >
                Starred
              </button>
            </div>
            <ul className="ul-container">
              {searchlist.map(each => (
                <AppointmentItem
                  item={each}
                  key={each.id}
                  starappointment={this.starappointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
