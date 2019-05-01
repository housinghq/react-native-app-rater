import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { colors } from './utils'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  button: {
    height: 48,
    width: 215,
    marginLeft: 40,
    marginRight: 16,
    borderRadius: 4,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  later: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#292929',
    opacity: 0.5
  }
})

export default class BottomView extends Component {

  renderButton = (onPress, buttonText, buttonType) => {
    const isDisabled = buttonType === 'disabled'
    const color = isDisabled ? colors.black10 : '#1fd290'
    return (
      <TouchableOpacity style={[styles.button, { backgroundColor: color }]} disabled={isDisabled} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    )
  }

  renderRemindLater = (onPress, laterButtonStyle) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.later, laterButtonStyle]}>Later</Text>
    </TouchableOpacity>
  )

  render() {
    const { onButtonPress, onLaterPress, style, buttonType, buttonText } = this.props
    const laterButtonStyle = (buttonType !== 'none') ? { marginLeft: 40 } : {}
    return (
      <View style={[styles.container, style]}>
        {this.renderRemindLater(onLaterPress, laterButtonStyle)}
        {(buttonType !== 'none') && this.renderButton(onButtonPress, buttonText, buttonType)}
      </View>
    )
  }
}

BottomView.propTypes = {
  onLaterPress: PropTypes.func.isRequired,
  onButtonPress: PropTypes.func,
  style: PropTypes.object,
  buttonText: PropTypes.string,
  buttonType: PropTypes.oneOf(['none', 'primary', 'disabled'])
}

BottomView.defaultProps = {
  style: {},
  buttonText: 'Submit' ,
  buttonType: 'primary',
  onButtonPress: () => {}
}
