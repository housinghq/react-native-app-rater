import isEmpty from 'ramda/src/isEmpty'
import isNil from 'ramda/src/isNil'
import anyPass from 'ramda/src/anyPass'
import cond from 'ramda/src/cond'
import equals from 'ramda/src/equals'
import always from 'ramda/src/always'
import clamp from 'ramda/src/clamp'
export const isNilOrEmpty = anyPass([isNil, isEmpty])
import { AsyncStorage, Dimensions } from 'react-native'

const guidelineBaseWidth = 360

export const DEVICE_WIDTH = Dimensions.get('window').width

const msPerDay = 24*60*60*1000
export const imageLabels = ['Awful', 'Poor', 'Average', 'Good', 'Great']

export function scaleWidth(width) {
  return width * DEVICE_WIDTH / guidelineBaseWidth
}

export const emojis = [
  {
    unselected: require('../assets/Emojis/Simple/Awful.png'),
    selected: require('../assets/Emojis/Color/Awful.png')
  },
  {
    unselected: require('../assets/Emojis/Simple/Poor.png'),
    selected: require('../assets/Emojis/Color/Poor.png')
  },
  {
    unselected: require('../assets/Emojis/Simple/Average.png'),
    selected: require('../assets/Emojis/Color/Average.png')
  },
  {
    unselected: require('../assets/Emojis/Simple/Good.png'),
    selected: require('../assets/Emojis/Color/Good.png')
  },
  {
    unselected: require('../assets/Emojis/Simple/Great.png'),
    selected: require('../assets/Emojis/Color/Great.png')
  }
]

export const stars = {
  unselected: require('../assets/Stars/simple.png'),
  selected: require('../assets/Stars/color.png')
}

export const closeImg = require('../assets/close_black.png')

export function setAlpha(color, alpha) {
  const alphaValue = (() => {
    const hex = Math.floor(clamp(0, 100, alpha) * (255 / 100)).toString(16)
    if (hex.length === 1) {
      return `0${hex}`
    }
    return hex
  })()
  return color.substring(0, 7) + alphaValue // Format: #rrggbbaa
}

export const colors = {
  black50: setAlpha('#000000', 50),
  black10: setAlpha('#000000', 10),
  black0: '#000000',
  white: '#ffffff',
  grey: '#292929',
  grey1: '#e6e6e6',
  grey2: '#f9f9f9',
  green: '#1fd290',
}

export function setShowDate(ratings = 0, threshold, noOfDays, isSubmitPressed) {
  let neverShow = false;
  const today = Date.now()
  const nextTime = today + noOfDays*msPerDay
  if (isSubmitPressed){
    neverShow = ratings >= threshold
  }
  const showDate = { nextTime, neverShow }
  try{
  AsyncStorage.setItem('SHOW_DATE', JSON.stringify(showDate))
  }catch(err){
  }
}

export default cond([
  [equals(1), always('awful')],
  [equals(2), always('poor')],
  [equals(3), always('average')],
  [equals(4), always('good')],
  [equals(5), always('great')]
])
