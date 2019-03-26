import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Linking,
  Platform,
  KeyboardAvoidingView
} from 'react-native'
import PropTypes from 'prop-types'
import getRatingType, { setAlpha, setShowDate } from './utils'
import RatingsDisplay from './RatingsDisplay';

const KeyBoardAvoidView = Platform.OS === 'ios' ? KeyboardAvoidingView : View

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0,
    justifyContent: 'flex-end'
  },
  thanksText: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: '#000000',
    textAlign: 'center'
  },
  thanksView: {
    height: 120,
    width: 265,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Arial',
    flexWrap: 'wrap',
    color: '#292929',
    marginTop: 24
  },
  subtext: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Arial',
    color: '#292929'
  },
  later: {
    textAlign: 'center',
    fontSize: 14,
    color: '#292929',
    marginBottom: 25,
    opacity: 0.5
  },
  button: {
    height: 36,
    width: 328,
    backgroundColor: '#1fd290',
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Arial',
    textAlign: 'center'
  },
  input: {
    width: '100%'-  32,
    marginLeft: 16,
    marginRight: 16
  }
})

export default class RatingComponent extends Component {
  
  state = {
    rateVisible: true,
    thanksVisible: false,
    rating: 0,
    feedback: ''
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

  onSubmit = () => {
    const { feedback, rating } = this.state
    const ratingType =  getRatingType(rating)
    this.props.sendEvent({ type: 'SUBMIT', ratingType, feedback })
  }

  onRemindLater = () => {
    const { sendEvent, dismiss } = this.props
    this.timer && clearTimeout(this.timer)
    if(!this.state.thanksVisible) {
      sendEvent({ type: 'LATER' })
    }
    this.setState({ rateVisible: false, thanksVisible: false }, dismiss)
  }

  onClose = (later = false, isThresholdRatings = false) => {
    const { storeLink, noOfDays } = this.props
    const { rating } = later ? 0 : this.state
    setShowDate(rating, noOfDays)

    if (later === true) {
      this.onRemindLater()
    } else {  // Submit clicked -> Show Thank You Screen and Send Submit Event
      this.showThankYouScreen()
      this.onSubmit()
    }

    if (isThresholdRatings === true) {
      this.redirectToStore(storeLink)
    }
  }

  onChangeText = (text) => {
    this.setState({ feedback: text })
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

  renderButton = (isThresholdRatings) => {
    const buttonStyle = [styles.button, !isThresholdRatings && {marginTop: 28}]
    const handleClick = () => this.onClose(false, isThresholdRatings)
    const buttonText = isThresholdRatings ? 'Rate us on App store' : 'Submit'
    return(
      <TouchableOpacity style={buttonStyle} onPress={handleClick}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    )
  }

  renderInputText = () => (
    <View style={{ width: '100%', alignSelf: 'flex-start' }}>
      <TextInput
        style={styles.input}
        onChangeText={this.onChangeText}
        placeholder="Type your feedback here"
      />
      {Platform.OS === 'ios' && (
        <View
          style={[
            styles.input,
            { height: 1, backgroundColor: '#979797', marginTop: 3 }
          ]}
        />
      )}
    </View>
  )

  renderRatings = (type) => (
    <View style={{width: '100%'}}>
      <Text style={styles.title}>Rate our App</Text>
      <Text style={styles.subtext}>We’d love to hear from you</Text>
      <RatingsDisplay
        setRating={this.setRating}
        type={type}
      />
    </View>
  )

  render() {
    const { thanksVisible, rateVisible, rating } = this.state
    const { type, thresholdRating } = this.props
    const show = rateVisible || thanksVisible
    return (
      <Modal
        visible={show}
        animationType="fade"
        transparent
        onRequestClose={() => this.onClose(true)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.onClose(true)}
          style={{ justifyContent: 'flex-end', flex: 1, backgroundColor: setAlpha('#000000', 50) }}
        >
          {rateVisible && (
            <KeyBoardAvoidView behavior="padding">
              <TouchableOpacity
                activeOpacity={1}
                style={{ backgroundColor: 'white', width: '100%', alignItems: 'center' }}
              >
                {this.renderRatings(type)}
                {(rating < thresholdRating && rating > 0) && this.renderInputText()}
                {(rating > 0) && this.renderButton(rating >= thresholdRating)}
                <TouchableOpacity style={{ marginTop: 16 }} onPress={() => this.onClose(true)}>
                  <Text style={styles.later}>Remind me Later</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </KeyBoardAvoidView>
          )}

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
}
