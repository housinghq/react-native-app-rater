import React, { Component } from 'react'
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import { imageLabels, emojis, stars, DEVICE_WIDTH } from './utils'

const defaultOpacity = 0.7
const styles = StyleSheet.create({
  containerView: {
    // equal width for all 5 after subtracting margins
    width: (DEVICE_WIDTH - 40) / 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatlistContainer: {
    marginHorizontal: 20
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
    width: '100%',
    textAlign: 'center',
    color: '#000000',
    opacity: defaultOpacity
  }
})

export default class RatingsCard extends Component {
  state = {
    selectedId : null
  }

  changeRatings = (index) => {
    this.props.setRating(index + 1)
    this.setState({ selectedId: index })
  }

  renderItem = ({ index }) => {
    const { type } = this.props
    const { selectedId } = this.state
    const emojiOpacity = (index === selectedId) ? 1 : defaultOpacity
    const fontWeight = (index === selectedId) ? '500' : 'normal'
    const rateIcon = (type === 1) ? 
      (selectedId !== null && (index <= selectedId) ? stars.selected : stars.unselected) : 
      (selectedId !== null && (index === selectedId) ? emojis[index].selected : emojis[index].unselected)

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.changeRatings(index)} style={styles.containerView}>
        <View>
          { type === 1 && (
            <Image style={styles.starThumbnail} source={rateIcon} />
          )}
          { type === 2 && (
            <Image style={styles.emojiThumbnail} opacity={emojiOpacity} source={rateIcon} />
          )}
        </View>
        {type === 2 && (
          <Text allowFontScaling={false} style={[styles.label, { opacity: emojiOpacity, fontWeight: fontWeight }]}>{imageLabels[index]}</Text>
        )}
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ width: '100%', marginTop: 16, marginBottom: 16 }}>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          horizontal
          extraData={this.state.selectedId}
          scrollEnabled={false}
          contentContainerStyle={styles.flatlistContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

RatingsCard.propTypes = {
  setRating: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired
}
