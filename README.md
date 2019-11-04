
# react-native-app-rater

## Getting started

`$ npm install @housing/react-native-app-rater --save`

### Mostly automatic installation

`$ react-native link @housing/react-native-app-rater`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `@housing/react-native-app-rater` and add `RNRateApp.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNRateApp.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `com.shellmonger.reactnative.RNRateAppPackage;` to the imports at the top of the file
  - Add `new RNRateAppPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':@housing/react-native-app-rater'
  	project(':react-native-app-rater').projectDir = new File(rootProject.projectDir, 	'../node_modules/@housing/react-native-app-rater/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':@housing/react-native-app-rater')
  	```

## Usage
```javascript
import RNRateApp from '@housing/react-native-app-rater';
const storeLink = Platform.select({	// To redirect users to the respective app store to rate app
  ios: 'App-Store-Link'
  android: 'Play-Store-Link'	
})	
export class RateApp extends Component {	
  render() {	
		<RNRateApp	
			type={2}	
			storeLink={storeLink}	
			noOfDays={7}	
			thanksScreenTimeout={1000}	
		/>	
	}	
}
  