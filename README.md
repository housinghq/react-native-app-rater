
# react-native-rate-app

## Getting started

`$ npm install react-native-rate-app --save`

### Mostly automatic installation

`$ react-native link react-native-rate-app`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-rate-app` and add `RNRateApp.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNRateApp.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.shellmonger.reactnative.RNRateAppPackage;` to the imports at the top of the file
  - Add `new RNRateAppPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-rate-app'
  	project(':react-native-rate-app').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-rate-app/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-rate-app')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNRateApp.sln` in `node_modules/react-native-rate-app/windows/RNRateApp.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Rate.App.RNRateApp;` to the usings at the top of the file
  - Add `new RNRateAppPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNRateApp from 'react-native-rate-app';

const storeLink = Platform.select({	// To redirect users to the respective app store to rate app
  ios: 'App-Store-Link'
  android: 'Play-Store-Link'
})
<RNRateApp
	type={1}
	storeLink={storeLink}
/>
```
## Props and Usage
 - type : Values - 0,1 or 2
	- 0 - Not Displayed
	- 1 - Ratings with Stars
	- 2 - Ratings with Emojis
 - noOfDays : Show Ratings next after 'noOfDays' Days (Default Value: 90 Days(3 months) )
 - onDismiss : A function called when Ratings is closed or not displayed (as Days < noOfDays or type is 0)
 - shouldAlwaysShow : When true the ratings will always be shown regardless of the noOfDays passed
 - thanksScreenTimeout : timeout (in ms) after which the ThankYouView will be closed (automatically)
 - sendEvent : function to handle GA-Events Call
  