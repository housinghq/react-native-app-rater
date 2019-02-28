/**
 * @providesModule Ratings
 */

import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import RatingComponent from './RatingComponent'
import { msPerDay } from './utils'

export default class Ratings extends Component {
  constructor(props) {
    super(props)
    this.state = { showRatingComponent: false }
  }

  showRatingComponent = () => this.shouldShow()
  dismissRatingCard = () => {
    this.setState({ showRatingComponent: false })
  }

  async shouldShow() {
    const showDate = await AsyncStorage.getItem('SHOW_DATE')
    if (showDate) {
      const { nextTime, neverShow, previouslyShown } = JSON.parse(showDate)
      if (!neverShow && previouslyShown) {
        const currentTime = new Date().getTime() / msPerDay
        if (currentTime >= nextTime) {
          this.setState({ showRatingComponent: true })
        }
      } else if (!neverShow) {
        this.setState({ showRatingComponent: true })
      }
    } else {
      this.setState({ showRatingComponent: true })
    }
  }

  render() {
    const { type, eventHandler, storeLink, noOfDays, thanksScreenTimeout } = this.props
    const { showRatingComponent } = this.state
    return (
      <View>
        {showRatingComponent && type !== 0 && (
          <RatingComponent
            dismiss={this.dismissRatingCard}
            type={type}
            eventHandler={eventHandler}
            storeLink={storeLink}
            noOfDays={noOfDays}
            timeout={thanksScreenTimeout}
          />
        )}
      </View>
    )
  }
}

Ratings.defaultProps = {
  type: 0,
  eventHandler: () => {}
}

Ratings.propTypes = {
  type: PropTypes.number,
  eventHandler: PropTypes.func
}
