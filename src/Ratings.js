import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import RatingComponent from './RatingComponent'

export default class Ratings extends Component {
  state = { showRatingComponent: false }

  componentDidMount() {
    this.shouldShow()
  }

  dismissRatingCard = () => {
    this.setState({ showRatingComponent: false }, this.props.onDismiss)
  }

  async shouldShow() {
    const { onBlur } = this.props
    const showDate = await AsyncStorage.getItem('SHOW_DATE')
    if (showDate) {
      const { nextTime, neverShow } = JSON.parse(showDate)
      if (neverShow === false) {
        const currentTime = Date.now()
        if (currentTime >= nextTime) {
          this.setState({ showRatingComponent: true })
        } else {
          onBlur()
        }
      } else {
        onBlur()
      }
    } else {
      this.setState({ showRatingComponent: true })
    }
  }

  render() {
    const { type, sendEvent, storeLink, noOfDays, thanksScreenTimeout, thresholdRating, title } = this.props
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
          thresholdRating={thresholdRating}
          title={title}
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
  onDismiss: () => {},
  onBlur: () => {},
  thresholdRating: 4,
  title: 'Rate Your Experience With Housing'
}

Ratings.propTypes = {
  type: PropTypes.number,
  thanksScreenTimeout: PropTypes.number,
  noOfDays: PropTypes.number,
  thresholdRating: PropTypes.number,
  sendEvent: PropTypes.func,
  onDismiss: PropTypes.func,
  onBlur:PropTypes.func,
  title: PropTypes.string
}
