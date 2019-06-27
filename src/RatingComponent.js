import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Linking,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import getRatingType, { colors, setShowDate, isNilOrEmpty } from './utils'
import RatingsDisplay from './RatingsDisplay'
import FeedbackView from './FeedbackView'
import BottomView from './BottomView'

const storeName = Platform.OS === 'ios' ? 'App' : 'Play'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: colors.black50 
  },
  wrapper: {
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 15
  },
  thanksText: {
    fontSize: 16,
    color: colors.black0,
    textAlign: 'center'
  },
  thanksView: {
    height: 70,
    width: 260,
    borderRadius: 2,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    flexWrap: 'wrap',
    color: colors.grey,
    marginTop: 24,
    marginBottom: 13
  }
})

export default class RatingComponent extends Component {
  state = {
    rateVisible: true,
    thanksVisible: false,
    rating: 0,
    showFeedback: false
  }

  componentDidMount(){
    this.props.sendEvent({ type: 'RATINGS_OPENED' })
  }

  redirectToStore = (storeLink) => Linking.canOpenURL(storeLink)
    .then( (supported) => {
        // eslint-disable-next-line no-unused-expressions
        supported && Linking.openURL(storeLink)
      },
      err => console.log(err)
    )

  showThankYouScreen = () => this.setState({ rateVisible: false, thanksVisible: true }, this.startTimer)

  startTimer = () => {
    const { timeout } = this.props
    this.timer = setTimeout(this.closeThankYouScreen, timeout)
  }

  closeThankYouScreen = () => this.setState({ thanksVisible: false }, this.props.dismiss)

  onSubmit = (feedback) => {
    const { rating } = this.state
    const { thresholdRating, noOfDays, nOfDayBelowThsldIfSbmt, nOfDayAboveThsldIfSbmt, storeLink } = this.props
    const isThresholdRating = rating >= thresholdRating
    const ratingType = getRatingType(rating)
    !isThresholdRating && this.closeFeedback()
    if (rating >= thresholdRating) {
      setShowDate(0, thresholdRating, nOfDayAboveThsldIfSbmt)
    } else if (rating >= 1 && rating < thresholdRating) {
      setShowDate(0, thresholdRating, nOfDayBelowThsldIfSbmt)
    } else {
      setShowDate(0, thresholdRating, noOfDays)
    }
    //setShowDate(rating, thresholdRating, noOfDays)
    isThresholdRating && this.redirectToStore(storeLink)
    this.showThankYouScreen()
    this.props.sendEvent({ type: 'SUBMIT', ratingType, feedback })
  }

  onPress = (feedback = '') => {
    const { rating } = this.state
    const { thresholdRating } = this.props
    if((rating < thresholdRating) && (isNilOrEmpty(feedback) || typeof feedback !== 'string')) {
      this.setState({ showFeedback: true })
    }
    else {
      feedback = (typeof feedback !== 'string') ? '' : feedback
      this.onSubmit(feedback)
    }
  }

  closeFeedback = (callback = null) => {
    if (typeof callback === 'function') {
      this.setState({ showFeedback: false }, callback)
    }
    else {
      this.setState({ showFeedback: false })
    }
  }

  onRemindLater = () => {
    const { sendEvent, dismiss } = this.props
    this.timer && clearTimeout(this.timer)
    if (!this.state.thanksVisible) {
      sendEvent({ type: 'LATER' })
    }
    this.setState({ rateVisible: false, thanksVisible: false }, dismiss)
  }

  onClose = () => {
    const { rating } = this.state
    console.log("atarOnClose() RC rating", rating)
    const { showFeedback } = this.state
    const { noOfDays, nOfDayIfNotRated, nOfDayBelowThsldNoSbmt,
      nOfDayAboveThsldNoSbmt, thresholdRating } = this.props
    !showFeedback && this.onRemindLater()
    showFeedback && this.closeFeedback(this.onRemindLater)
    if (rating >= thresholdRating) {
      setShowDate(0, thresholdRating, nOfDayAboveThsldNoSbmt)
    } else if (rating >= 1 && rating < thresholdRating) {
      setShowDate(0, thresholdRating, nOfDayBelowThsldNoSbmt)
    } else if (rating == 0) {
      setShowDate(0, thresholdRating, nOfDayIfNotRated)
    } else {
      setShowDate(0, thresholdRating, noOfDays)
    }
  }

  setRating = rating => {
    const ratingType = getRatingType(rating)
    this.setState({ rating }, () => this.props.sendEvent({ type: 'CLICK', ratingType }))
  }

  renderThankYouScreen = () => (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View style={styles.thanksView}>
        <Text style={styles.thanksText}>Thank You for your feedback!</Text>
      </View>
    </View>
  )

  renderTitle = (title) => (
    <Text style={styles.title}>{title}</Text>
  )

  renderRatings = (type) => (
    <View style={{ width: '100%' }}>
      <RatingsDisplay
        setRating={this.setRating}
        type={type}
      />
    </View>
  )

  renderBottomView = (rating, thresholdRating) => {
    const buttonType = (rating > 0) ? 'primary' : 'none'
    const buttonText = (rating >= thresholdRating) ?
      `Rate us on ${storeName} store` :
      'Tell us what went wrong'
    return (
      <BottomView
        style={{ marginBottom: 25 }}
        positiveButtonType={buttonType}
        positiveButtonText={buttonText}
        onPositiveButtonPress={this.onPress}
        onLaterPress={this.onClose}
      />
    )
  }

  render() {
    //console.log("atarRender() RC states", this.state)
    //console.log("atarRender() RC props", this.props)
    const { thanksVisible, rateVisible, rating, showFeedback } = this.state
    const { type, thresholdRating, title, feedbackPlaceholder } = this.props
    const show = rateVisible || thanksVisible
    return (
      <Modal
        visible={show}
        animationType="fade"
        transparent
        onRequestClose={this.onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.onClose}
          style={styles.container}
        >
          {rateVisible && (
            <View>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.wrapper}
              >
                {this.renderTitle(title)}
                {this.renderRatings(type)}
                {this.renderBottomView(rating, thresholdRating)}
              </TouchableOpacity>
            </View>
          )}
          <Modal visible={showFeedback} animationType="slide" onRequestClose={this.closeFeedback}>
            <FeedbackView
              onClose={this.closeFeedback}
              onPressLater={this.onClose}
              onSubmit={this.onSubmit}
              placeholder={feedbackPlaceholder}
            />
          </Modal>
          {thanksVisible && this.renderThankYouScreen()}
        </TouchableOpacity>
      </Modal>
    )
  }
}

RatingComponent.defaultProps = {
  type: 1,
  timeout: 1000,
  noOfDays: 90,
  thresholdRating: 4,
  sendEvent: () => {},
  dismiss: () => {}
}

RatingComponent.propTypes = {
  dismiss: PropTypes.func,
  type: PropTypes.number,
  timeout: PropTypes.number,
  noOfDays: PropTypes.number,
  thresholdRating: PropTypes.number,
  sendEvent: PropTypes.func,
  feedbackPlaceholder: PropTypes.string.isRequired
}
