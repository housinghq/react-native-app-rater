import R from 'ramda'
import { AsyncStorage } from 'react-native'

export const imageLabels = ['Awful', 'Poor', 'Average', 'Good', 'Great']

export const emojiSrc = [
  {
    simple: require('../assets/Emojis/Simple/Awful.png'),
    color: require('../assets/Emojis/Color/Awful.png')
  },
  {
    simple: require('../assets/Emojis/Simple/Poor.png'),
    color: require('../assets/Emojis/Color/Poor.png')
  },
  {
    simple: require('../assets/Emojis/Simple/Average.png'),
    color: require('../assets/Emojis/Color/Average.png')
  },
  {
    simple: require('../assets/Emojis/Simple/Good.png'),
    color: require('../assets/Emojis/Color/Good.png')
  },
  {
    simple: require('../assets/Emojis/Simple/Great.png'),
    color: require('../assets/Emojis/Color/Great.png')
  }
]

export const star = {
  simple: require('../assets/Stars/simple.png'),
  color: require('../assets/Stars/color.png')
}

export function setAlpha(color, alpha) {
  const alphaValue = (() => {
    const hex = Math.floor(R.clamp(0, 100, alpha) * (255 / 100)).toString(16)
    if (hex.length === 1) {
      return `0${hex}`
    }
    return hex
  })()
  return color.substring(0, 7) + alphaValue // Format: #rrggbbaa
}

export function setShowDate(ratings = 0) {
  const today = new Date().getTime() / 1000
  const nextTime = today + 5
  const neverShow = ratings === 5
  const showDate = { nextTime, neverShow, previouslyShown: true }
  AsyncStorage.setItem('SHOW_DATE', JSON.stringify(showDate))
}
