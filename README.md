
# react-native-app-rater

## Getting started

`$ npm install react-native-app-rater --save`

### Mostly automatic installation

`$ react-native link react-native-app-rater`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-app-rater` and add `RNAppRater.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAppRater.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNAppRaterPackage;` to the imports at the top of the file
  - Add `new RNAppRaterPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-app-rater'
  	project(':react-native-app-rater').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-app-rater/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-app-rater')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNAppRater.sln` in `node_modules/react-native-app-rater/windows/RNAppRater.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using App.Rater.RNAppRater;` to the usings at the top of the file
  - Add `new RNAppRaterPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNAppRater from 'react-native-app-rater';

// TODO: What to do with the module?
RNAppRater;
```
  