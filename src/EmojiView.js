import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { imageLabels, emojiSrc } from './utils'

const defaultOpacity = 0.7
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatlistContainer: {
    flexDirection: 'row',
    marginLeft: 18,
    marginRight: 18,
    justifyContent: 'space-between'
  },
  emojicon: {
    height: 37,
    width: 37
  },
  label: {
    fontSize: 12,
    color: '#000000',
    opacity: defaultOpacity
  }
})

export default class Emojis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: emojiSrc.map(img => img.simple),
      opacity: emojiSrc.map(() => defaultOpacity),
      prevIndex: 0
    }
  }

  toggleEmoji = (index) => {
    const { data, prevIndex, opacity } = this.state
    const { showButton, showInput, setRating } = this.props
    data[prevIndex] = emojiSrc[prevIndex].simple
    data[index] = emojiSrc[index].color
    opacity[prevIndex] = defaultOpacity
    opacity[index] = 1
    if (prevIndex !== index) {
      setRating(index + 1)
    }
    if (index === 4) {
      showButton()
    } else {
      showInput()
    }
    this.setState({
      data,
      opacity,
      prevIndex: index
    })
  }

  renderItem = ({ item, index }) => {
    const { opacity } = this.state
    return (
      <View style={styles.containerView}>
        <TouchableOpacity onPress={() => this.toggleEmoji(index)}>
          <Image style={styles.emojicon} opacity={opacity[index]} source={item} />
        </TouchableOpacity>
        <Text style={[styles.label, { opacity: opacity[index] }]}>{imageLabels[index]}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{ width: '100%', marginTop: 16, marginBottom: 16, zIndex: 0 }}>
        <FlatList
          contentContainerStyle={[styles.flatlistContainer, { zIndex: 1 }]}
          data={this.state.data}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

Emojis.propTypes = {
  showButton: PropTypes.func.isRequired,
  showInput: PropTypes.func.isRequired,
  setRating: PropTypes.func.isRequired
}
