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
  constructor(props) {
    super(props)
    this.state = {
      rateVisible: true,
      thanksVisible: false,
      showButton: false,
      showInputText: false,
      rating: 1,
      feedback: ''
    }
  }

  componentDidMount(){
    this.props.sendEvent({ type: 'ratings' })
  }

  onClose = (later = false, maxRatings = false) => {
    const { dismiss, storeLink, noOfDays } = this.props
    let rating = 0
    if (later === false) {
      // eslint-disable-next-line prefer-destructuring
      rating = this.state.rating
    }
    if (maxRatings === true) {
      Linking.canOpenURL(storeLink).then(
        (supported) => {
          // eslint-disable-next-line no-unused-expressions
          supported && Linking.openURL(storeLink)
        },
        err => console.log(err)
      )
    }
    setShowDate(rating, noOfDays)
    if (later === true) {
      clearTimeout(this.timer)
      this.setState({ rateVisible: false, thanksVisible: false }, dismiss)
      if(!this.state.thanksVisible) {
        this.onRemindLater()
      }
    } else {
      this.setState({ rateVisible: false, thanksVisible: true }, this.startTimer)
      this.onSubmit()
    }
  }

  setRating = rating => {
    const ratingType = getRatingType(rating)
    this.setState({ rating }, () => this.props.sendEvent({ type: 'click', ratingType }))
  }

  onChangeText = (text) => {
    this.setState({ feedback: text })
  }

  onSubmit = () => {
    const { feedback, rating } = this.state
    const ratingType =  getRatingType(rating)
    this.props.sendEvent({ type: 'submit', ratingType, feedback })
  }

  onRemindLater = () => {
    this.props.sendEvent({ type: 'later' })
  }

  closeThankYouScreen = () => this.setState({ thanksVisible: false }, this.props.dismiss)

  startTimer = () => {
    const { timeout } = this.props
    this.timer = setTimeout(this.closeThankYouScreen, timeout)
  }

  showButton = () =>
    this.setState({
      showButton: true,
      showInputText: false
    })

  showInput = () =>
    this.setState({
      showInputText: true,
      showButton: false
    })

  render() {
    const { showButton, showInputText, thanksVisible, rateVisible } = this.state
    const { type } = this.props
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
          onPressOut={() => {
            this.onClose(true)
          }}
          style={{ justifyContent: 'flex-end', flex: 1, backgroundColor: setAlpha('#000000', 50) }}
        >
          {rateVisible && (
            <KeyBoardAvoidView behavior="padding">
              <TouchableOpacity
                activeOpacity={1}
                style={{ backgroundColor: 'white', width: '100%', alignItems: 'center' }}
              >
                <Text style={styles.title}>Rate our App</Text>
                <Text style={styles.subtext}>We’d love to hear from you</Text>
                <RatingsDisplay
                  showButton={this.showButton}
                  showInput={this.showInput}
                  setRating={this.setRating}
                  type={type}
                />
                {showButton && (
                  <View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.onClose(false, true)}
                    >
                      <Text style={styles.buttonText}>Rate Us on App Store</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {showInputText && (
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
                    <TouchableOpacity
                      style={[styles.button, { marginTop: 28 }]}
                      onPress={this.onClose}
                    >
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity style={{ marginTop: 16 }} onPress={() => this.onClose(true)}>
                  <Text style={styles.later}>Remind me Later</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </KeyBoardAvoidView>
          )}
          {thanksVisible && (
            <View
              activeOpacity={1}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            >
              <View style={styles.thanksView}>
                <Text style={styles.thanksText}>Thank You for your feedback!</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    )
  }
}

RatingComponent.defaultProps = {
  type: 0,
  timeout: 1000,
  noOfDays: 90,
  sendEvent: () => {}
}

RatingComponent.propTypes = {
  dismiss: PropTypes.func.isRequired,
  type: PropTypes.number,
  timeout: PropTypes.number,
  noOfDays: PropTypes.number,
  sendEvent: PropTypes.func
}
