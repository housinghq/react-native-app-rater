import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import RatingComponent from './RatingComponent'

export default class Ratings extends Component {
  constructor(props) {
    super(props)
    this.state = { showRatingComponent: false }
  }

  componentDidMount() {
    this.shouldShow()
  }

  dismissRatingCard = () => {
    this.setState({ showRatingComponent: false }, this.props.onDismiss)
  }

  async shouldShow() {
    const { onDismiss } = this.props
    const showDate = await AsyncStorage.getItem('SHOW_DATE')
    if (showDate) {
      const { nextTime, neverShow } = JSON.parse(showDate)
      if (neverShow === false) {
        const currentTime = Date.now
        if (currentTime >= nextTime) {
          this.setState({ showRatingComponent: true })
        } else {
          onDismiss()
        }
      } else {
        onDismiss()
      }
    } else {
      this.setState({ showRatingComponent: true })
    }
  }

  render() {
    const { type, sendEvent, storeLink, noOfDays, thanksScreenTimeout } = this.props
    const { showRatingComponent } = this.state
    if(showRatingComponent === true) {
      return (
        <RatingComponent
          dismiss={this.dismissRatingCard}
          type={type}
          sendEvent={sendEvent}
          storeLink={storeLink}
          noOfDays={noOfDays}
          timeout={thanksScreenTimeout}
        />
      )
    }
    return null
  }
}

Ratings.defaultProps = {
  type: 0,
  sendEvent: () => {},
  noOfDays: 90,
  thanksScreenTimeout: 3000,
  onDismiss: () => {}
}

Ratings.propTypes = {
  type: PropTypes.number,
  thanksScreenTimeout: PropTypes.number,
  noOfDays: PropTypes.number,
  sendEvent: PropTypes.func,
  onDismiss: PropTypes.func
}
