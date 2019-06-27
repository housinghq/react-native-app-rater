import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
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
    console.log("atarshouldShow() R showDate",showDate)
    if (showDate) {
      const { nextTime, neverShow } = JSON.parse(showDate)
      if (neverShow === false) {
        const currentTime = Date.now()
        console.log("currentTime",currentTime)
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
    
    const { type, sendEvent, storeLink, noOfDays, thanksScreenTimeout,
      nOfDayIfNotRated,nOfDayBelowThsldNoSbmt,nOfDayBelowThsldIfSbmt,
      nOfDayAboveThsldNoSbmt,nOfDayAboveThsldIfSbmt,
       thresholdRating, title, feedbackPlaceholder } = this.props
    const { showRatingComponent } = this.state
    console.log("atarRender() R showRatingComponent",showRatingComponent)
    if(showRatingComponent === true) {
      return (
        <RatingComponent
          dismiss={this.dismissRatingCard}
          type={type}
          sendEvent={sendEvent}
          storeLink={storeLink}
          noOfDays={noOfDays}
          nOfDayIfNotRated={nOfDayIfNotRated}
          nOfDayBelowThsldNoSbmt={nOfDayBelowThsldNoSbmt}
          nOfDayBelowThsldIfSbmt={nOfDayBelowThsldIfSbmt}
          nOfDayAboveThsldNoSbmt={nOfDayAboveThsldNoSbmt}
          nOfDayAboveThsldIfSbmt={nOfDayAboveThsldIfSbmt}
          timeout={thanksScreenTimeout}
          thresholdRating={thresholdRating}
          title={title}
          feedbackPlaceholder={feedbackPlaceholder}
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
  nOfDayIfNotRated:3,
  nOfDayBelowThsldNoSbmt:10,
  nOfDayBelowThsldIfSbmt:90,
  nOfDayAboveThsldNoSbmt:7,
  nOfDayAboveThsldIfSbmt:1000,
  thanksScreenTimeout: 3000,
  onDismiss: () => {},
  onBlur: () => {},
  thresholdRating: 4,
  title: 'Rate Your Experience With Housing',
  feedbackPlaceholder: 'E.g. I’m not able to access owner or agent contact details'
}

Ratings.propTypes = {
  type: PropTypes.number,
  thanksScreenTimeout: PropTypes.number,
  noOfDays: PropTypes.number,
  noOfDayIfNotRated: PropTypes.number,
  nOfDayBelowThsldNoSbmt: PropTypes.number,
  nOfDayBelowThsldIfSbmt: PropTypes.number,
  nOfDayAboveThsldIfSbmt: PropTypes.number,
  nOfDayAboveThsldIfSbmt: PropTypes.number,
  thresholdRating: PropTypes.number,
  sendEvent: PropTypes.func,
  onDismiss: PropTypes.func,
  onBlur:PropTypes.func,
  title: PropTypes.string,
  feedbackPlaceholder: PropTypes.string
}
