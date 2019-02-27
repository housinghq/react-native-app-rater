import React, { Component } from 'react'
import { View, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { star } from './utils'

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
    marginLeft: 41,
    marginRight: 41
  },
  starThumbnail: {
    height: 22,
    width: 23
  }
})

export default class Stars extends Component {
  constructor(props) {
    super(props)
    const data = []
    for (let i = 1; i <= 5; i += 1) {
      data.push(star.simple)
    }
    this.state = {
      data,
      prevIndex: -1
    }
  }

  changeRatings = (index) => {
    const { data, prevIndex } = this.state
    const { showButton, showInput, setRating } = this.props
    if (prevIndex < index) {
      for (let i = prevIndex + 1; i <= index; i += 1) {
        data[i] = star.color
      }
      if (index === 4) {
        showButton()
      } else if (prevIndex === -1) {
        showInput()
      }
      setRating(index + 1)
      this.setState({
        data,
        prevIndex: index
      })
    } else if (prevIndex > index) {
      for (let i = index + 1; i <= prevIndex; i += 1) {
        data[i] = star.simple
      }
      if (prevIndex === 4) {
        showInput()
      }
      setRating(index + 1)
      this.setState({
        data,
        prevIndex: index
      })
    }
  }

  renderItem = ({ item, index }) => (
    <View style={styles.containerView}>
      <TouchableOpacity onPress={() => this.changeRatings(index)}>
        <Image style={styles.starThumbnail} source={item} />
      </TouchableOpacity>
    </View>
  )

  render() {
    return (
      <View style={{ width: '100%', marginTop: 32, zIndex: 0, marginBottom: 32 }}>
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

Stars.propTypes = {
  showButton: PropTypes.func.isRequired,
  showInput: PropTypes.func.isRequired,
  setRating: PropTypes.func.isRequired
}
