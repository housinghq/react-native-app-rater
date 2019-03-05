import React, { Component } from 'react'
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import { imageLabels, emojiSrc, star } from './utils'

const defaultOpacity = 0.7
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  flatlistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20
  },
  starThumbnail: {
    height: 22,
    width: 23
  },
  emojiThumbnail: {
    height: 37,
    width: 37
  },
  label: {
    fontSize: 12,
    color: '#000000',
    opacity: defaultOpacity
  }
})

export default class RatingsCard extends Component {
  constructor(props) {
    super(props)
    const { data, opacity } = this.getIcons(props.type)
    this.state = {
      data,
      opacity
    }
  }

  getIcons(type) {
    const data = []
    const opacity = []
    if (type === 1) {
      for (let i = 1; i <= 5; i += 1) {
        data.push(star.unselected)
      }
    } else {
      opacity = emojiSrc.map(() => defaultOpacity)
      data = emojiSrc.map(img => img.unselected)
    }
    return { data, opacity }
  }

  changeRatings = (index) => {
    const { data, opacity } = this.state
    const { showButton, showInput, setRating, type } = this.props
    if( type === 1 ) {
      for (let i = 0; i <= 4; i += 1) {
        data[i] = (i <= index) ? star.selected : star.unselected
      }
    } else {
      for (let i = 0; i <= 4; i += 1) {
        data[i] = (i === index) ? emojiSrc[i].selected : emojiSrc[i].unselected
        opacity[i] = (i === index) ? 1 : defaultOpacity
      }
    }
    if (index === 4) {
      showButton()
    } else {
      showInput()
    }
    setRating(index + 1)
    this.setState({
      data,
      opacity
    })
  }

  renderItem = ({ item, index }) => {
    const { type } = this.props
    const { opacity } = this.state
    return (
      <View style={styles.containerView}>
        <TouchableOpacity onPress={() => this.changeRatings(index)}>
          { type === 1 && (
            <Image style={styles.starThumbnail} source={item} />
          )}
          { type === 2 && (
            <Image style={styles.emojiThumbnail} opacity={opacity[index]} source={item} />
          )}
        </TouchableOpacity>
        { type === 2 && (
          <Text style={[styles.label, { opacity: opacity[index] }]}>{imageLabels[index]}</Text>
        )}
      </View>
    )
  }

  render() {
    return (
      <View style={{ width: '100%', marginTop: 16, zIndex: 0, marginBottom: 16 }}>
        <FlatList
          data={this.state.data}
          scrollEnabled={false}
          contentContainerStyle={[styles.flatlistContainer, { zIndex: 1 }]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

RatingsCard.propTypes = {
  showButton: PropTypes.func.isRequired,
  showInput: PropTypes.func.isRequired,
  setRating: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired
}
