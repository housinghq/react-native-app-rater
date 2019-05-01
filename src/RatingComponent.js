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
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 15
  },
  thanksText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center'
  },
  thanksView: {
    height: 70,
    width: 260,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#292929',
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

  onSubmit = (feedback = '') => {
    const { rating } = this.state
    const { thresholdRating, noOfDays, storeLink } = this.props
    const isThresholdRating = rating >= thresholdRating
    if( !isThresholdRating && (isNilOrEmpty(feedback) || typeof feedback !== 'string')) {
      this.setState({ showFeedback: true })
    }
    else {
      this.closeFeedback()
      const ratingType =  getRatingType(rating)
      setShowDate(rating, noOfDays)
      isThresholdRating && this.redirectToStore(storeLink)
      this.showThankYouScreen()
      this.props.sendEvent({ type: 'SUBMIT', ratingType, feedback })
    }
  }

  closeFeedback = (callback = () => {}) => {
    if(typeof callback === 'function') {
      this.setState({ showFeedback: false }, callback)
    }
    else {
      this.setState({ showFeedback: false })
    }
  }

  onRemindLater = () => {
    const { sendEvent, dismiss } = this.props
    this.timer && clearTimeout(this.timer)
    if(!this.state.thanksVisible) {
      sendEvent({ type: 'LATER' })
    }
    this.setState({ rateVisible: false, thanksVisible: false }, dismiss)
  }

  onClose = () => {
    const { showFeedback } = this.state
    const { noOfDays } = this.props
    !showFeedback && this.onRemindLater()
    showFeedback && this.closeFeedback(this.onRemindLater)
    setShowDate(0, noOfDays)
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
        buttonType={buttonType}
        buttonText={buttonText}
        onButtonPress={this.onSubmit}
        onLaterPress={this.onClose}
      />
    )
  }

  render() {
    const { thanksVisible, rateVisible, rating, showFeedback } = this.state
    const { type, thresholdRating, title } = this.props
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
  sendEvent: PropTypes.func
}
