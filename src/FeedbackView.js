import React, { PureComponent } from 'react'
import { View, ScrollView, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import BottomView from './BottomView'
import { isNilOrEmpty, closeImg, colors, scaleWidth } from './utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: '500',
    width: '100%',
    fontSize: 18,
    color: colors.grey,
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
    color: colors.grey,
    opacity: 0.5,
    marginLeft: 40
  },
  textView: {
    marginTop: 45,
    marginHorizontal: 16,
    height: 140,
    width:  scaleWidth(325),
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 5,
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grey1,
    backgroundColor: colors.grey2,
    textAlignVertical: 'top'
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 35
  }
})

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
    <Text allowFontScaling={false} style={styles.title}>
      {title}
    </Text>
  )

  renderCloseButton = (onClose) => (
    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
      <Image source={closeImg} resizeMode="contain" style={{ height: 20, width: 20 }} />
    </TouchableOpacity>
  )

  renderTextInput = (placeholder) => (
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
    const positiveButtonType = (isNilOrEmpty(feedback)) ? 'disabled' : 'primary'
    return (
      <BottomView
        style={{ marginTop: 35 }}
        onPositiveButtonPress={this.onPressSubmit}
        onLaterPress={onLaterPress}
        positiveButtonText="Submit"
        positiveButtonType={positiveButtonType}
      />
    )
  }

  render() {
    const { onClose, onPressLater, placeholder } = this.props
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        contentInset={{ bottom: 25 }}
      >
        {this.renderCloseButton(onClose)}
        <View style = {{ flex: 1, alignItems: 'center', width: '100%' }}>
          {this.renderTitle('What went wrong?')}
          {this.renderTextInput(placeholder)}
          {this.renderBottomView(onPressLater)}
        </View>
      </ScrollView>
    )
  }
}

FeedbackView.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPressLater: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
}
