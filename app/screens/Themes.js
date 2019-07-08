import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ListItem, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { changePrimaryColor } from '../actions/theme';

const styles = EStyleSheet.create({
  $blue: '$primaryBlue',
  $orange: '$primaryOrange',
  $green: '$primaryGreen',
  $purple: '$primaryPurple',
});

class Themes extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  };

  handleThemesPress = (color) => {
    this.props.dispatch(changePrimaryColor(color));
    this.props.navigation.goBack();
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          title="Blue"
          onPress={() => this.handleThemesPress(styles.$blue)}
          checkmark={false}
          rightIcon={
            <Ionicons name="ios-checkmark-circle" size={23} color={styles.$blue} />
          }
        />
        <Divider />
        <ListItem
          title="Green"
          onPress={() => this.handleThemesPress(styles.$green)}
          checkmark={false}
          rightIcon={
            <Ionicons name="ios-checkmark-circle" size={23} color={styles.$green} />
          }
        />
        <Divider />
        <ListItem
          title="Orange"
          onPress={() => this.handleThemesPress(styles.$orange)}
          checkmark={false}
          rightIcon={
            <Ionicons name="ios-checkmark-circle" size={23} color={styles.$orange} />
          }
        />
        <Divider />
        <ListItem
          title="Purple"
          onPress={() => this.handleThemesPress(styles.$blue)}
          checkmark={false}
          rightIcon={
            <Ionicons name="ios-checkmark-circle" size={23} color={styles.$purple} />
          }
        />
        <Divider />
      </ScrollView>
    );
  }
}

export default connect()(Themes);
