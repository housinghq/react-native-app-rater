import React, { PureComponent } from 'react'
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import BottomView from './BottomView'
import { isNilOrEmpty, closeImg } from './utils'

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 18,
    color: '#292929',
    textAlign: 'center',
    marginTop: 45
  },
  closeButton: {
    position: 'absolute',
    top: 45,
    left: 20,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  later: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#292929',
    opacity: 0.5,
    marginLeft: 40
  },
  textView: {
    marginTop: 45,
    marginHorizontal: 16,
    height: 140,
    width: 328,
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 15, 
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top'
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 35
  }
})

const placeholder = 'E.g. I’m not able to access owner or agent contact details'

export default class FeedbackView extends PureComponent {
  state = {
    feedback: ''
  }

  onPressSubmit = () => {
    const { feedback } = this.state
    this.props.onSubmit(feedback)
  }

  onChangeText = (text) => this.setState({ feedback: text })

  renderTitle = (title) => (
    <Text style={styles.title}>
      {title}
    </Text>
  )

  renderCloseButton = (onClose) => (
    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
      <Image source={closeImg} resizeMode="contain" style={{ height: 20, width: 20 }} />
    </TouchableOpacity>
  )

  renderTextInput = () => (
    <TextInput
      style={styles.textView}
      autoFocus
      multiline
      placeholder={placeholder}
      onChangeText={this.onChangeText}
    />
  )

  renderBottomView = (onLaterPress) => {
    const { feedback } = this.state
    const buttonType = (isNilOrEmpty(feedback)) ? 'disabled' : 'primary'
    return (
      <BottomView
        style={{ marginTop: 35 }}
        onButtonPress={this.onPressSubmit}
        onLaterPress={onLaterPress}
        buttonText="Submit"
        buttonType={buttonType}
      />
    )
  }

  render() {
    const { onClose, onPressLater } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.renderCloseButton(onClose)}
        <View style = {{ flex: 1, alignItems: 'center' }}>
          {this.renderTitle('What went wrong?')}
          {this.renderTextInput()}
          {this.renderBottomView(onPressLater)}
        </View>
      </View>
    )
  }
}

FeedbackView.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPressLater: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
