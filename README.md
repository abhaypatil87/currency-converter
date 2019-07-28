# Currency Converter

This React-Native app is based on the tutorial given by Spencer Cali, on his website [free video course](http://learn.handlebarlabs.com/p/react-native-basics-build-a-currency-converter)

### Tech
The original course was based on react-native 31. While installing, I decided to upgrade all the tech-stack to the latest versions. Doing so, there were a few places I had to update the code.
- [react-native](https://facebook.github.io/react-native/)
- [react](https://reactjs.org/)
- [redux](https://redux.js.org/)

### Installation

```sh
$ npm install
$ npm run ios
```

### Development

Want to contribute? Great! There are a few things in my to-do list for this app, I am not equipped for those implementations yet. I am learning steadily and getting myself more familier with the tech-stack and in due time I'd be able to scratch the items off the list.

### Todos

 - Write Test-Cases
 - Implement two-way conversion without, essentially making the 'reverse' feature unnecessary
 - ~~Filter to the currency lists~~
 - ~~Localisation~~
 - Mark favourites

## Localisation
20190721 - Added expo-localization package with the help of the command 'expo install expo-localization'.
See more: [expo-localization](https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/sdk/localization.md)

## Location Tracking
20190728 - This is a try-out feature I thought about. Whenever I am traveling, one of the first things that come to my mind is, _how much does this thing cost in my home currency?_ So I decided to take advantage of this situation and try to implement a solution. The key term here is **Reverse Geocoding**. There are many APIs available online that will take latitude and longitude as an input and give you your location, as in city, province/state, and country. I chose Bing's location APIs as the results are something that are closest to my needs. The only thing I need is the country the user is in right now. So, after I get the country's 2-letter ISO code, I feed that code to yet another public API to get the currency of this country. Once I have this information, I re-render the component feeding this newly obtained currency.

License
----

MIT


**Hellow World...Be Passionate...**
