/**
 * @providesModule Ratings
 */

import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import RatingComponent from './RatingComponent'

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
        const currentTime = new Date().getTime() / 1000
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
    const { type } = this.props
    const { showRatingComponent } = this.state
    return (
      <View>
        {showRatingComponent && type !== 0 && (
          <RatingComponent dismiss={this.dismissRatingCard} type={type} />
        )}
      </View>
    )
  }
}

Ratings.defaultProps = {
  type: 0
}

Ratings.propTypes = {
  type: PropTypes.number
}
