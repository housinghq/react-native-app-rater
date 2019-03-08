import React, { Component } from 'react'
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import { imageLabels, emojis, stars } from './utils'

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
    const rateIcon = (type === 1) ? 
      (selectedId !== null && (index <= selectedId) ? stars.selected : stars.unselected) : 
      (selectedId !== null && (index === selectedId) ? emojis[index].selected : emojis[index].unselected)

    return (
      <View style={styles.containerView}>
        <TouchableOpacity onPress={() => this.changeRatings(index)}>
          { type === 1 && (
            <Image style={styles.starThumbnail} source={rateIcon} />
          )}
          { type === 2 && (
            <Image style={styles.emojiThumbnail} opacity={emojiOpacity} source={rateIcon} />
          )}
        </TouchableOpacity>
        { type === 2 && (
          <Text style={[styles.label, { opacity: emojiOpacity }]}>{imageLabels[index]}</Text>
        )}
      </View>
    )
  }

  render() {
    return (
      <View style={{ width: '100%', marginTop: 16, marginBottom: 16 }}>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          extraData={this.state.selectedId}
          scrollEnabled={false}
          contentContainerStyle={[styles.flatlistContainer]}
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
