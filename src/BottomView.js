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
    width: '63%',
    marginRight: 16,
    borderRadius: 4,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.white,
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  later: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: colors.grey,
    opacity: 0.5
  }
})

export default class BottomView extends Component {

  renderPositiveButton = (onPress, buttonText, buttonType) => {
    const isDisabled = buttonType === 'disabled'
    const color = isDisabled ? colors.black10 : colors.green
    return (
      <TouchableOpacity style={[styles.button, { backgroundColor: color }]} disabled={isDisabled} onPress={onPress}>
        <Text allowFontScaling={false} style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    )
  }

  renderRemindLater = (onPress) => (
    <View style={{flex: 1, justifyContent:'center', alignContent:'center'}}>
      <TouchableOpacity onPress={onPress}>
        <Text allowFontScaling={false} style={styles.later}>Later</Text>
      </TouchableOpacity>
    </View>
  )

  render() {
    const { onPositiveButtonPress, onLaterPress, style, positiveButtonType, positiveButtonText } = this.props
    return (
      <View style={[styles.container, style]}>
        {this.renderRemindLater(onLaterPress)}
        {(positiveButtonType !== 'none') &&
          this.renderPositiveButton(onPositiveButtonPress, positiveButtonText, positiveButtonType)
        }
      </View>
    )
  }
}

BottomView.propTypes = {
  onLaterPress: PropTypes.func.isRequired,
  onPositiveButtonPress: PropTypes.func,
  style: PropTypes.object,
  positiveButtonText: PropTypes.string,
  positiveButtonType: PropTypes.oneOf(['none', 'primary', 'disabled'])
}

BottomView.defaultProps = {
  style: {},
  positiveButtonText: 'Submit' ,
  positiveButtonType: 'primary',
  onPositiveButtonPress: () => {}
}
