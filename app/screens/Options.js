import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Divider } from 'react-native-elements';

import { connectAlert } from '../components/Alert';

const ICON_COLOUR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
  };

  handleThemesPress = () => {
    this.props.navigation.navigate('Themes', { title: 'Themes' });
  };

  handleSitePress = () => {
    Linking.openURL('https://fixer.handlebarlabs.com/').catch(
      () => this.props.alertWithType('error', 'Error occured', 'The site cannot be opened at this moment.'),
    );
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          title="Themes"
          onPress={this.handleThemesPress}
          rightIcon={
            <Ionicons name="ios-arrow-forward" size={ICON_SIZE} color={ICON_COLOUR} />
          }
        />
        <Divider />
        <ListItem
          title="Fixer.io"
          onPress={this.handleSitePress}
          rightIcon={
            <Ionicons name="ios-link" size={ICON_SIZE} color={ICON_COLOUR} />
          }
        />
        <Divider />
      </ScrollView>
    );
  }
}

export default connectAlert(Options);
