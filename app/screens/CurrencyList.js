import React, { Component } from 'react';
import { FlatList, View, StatusBar } from 'react-native';
import { ListItem, Divider, SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

class CurrencList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currenciesList: currencies,
    };
  }
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    primaryColor: PropTypes.string,
  };

  filter = (text) => {
    this.setState({
      value: text,
    });
  
    let filteredCurrencies = currencies.filter(item => {
      const itemData = `${item.code.toUpperCase()} ${item.text.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      currenciesList: filteredCurrencies,
    })
  };

  handlePress = (currency) => {
    const { type } = this.props.navigation.state.params;
    if (type === 'base') {
      this.props.dispatch(changeBaseCurrency(currency));
    } else if (type === 'quote') {
      this.props.dispatch(changeQuoteCurrency(currency));
    }
    this.props.navigation.goBack(null);
  };

  renderHeader = () => {
    return (
      <SearchBar 
        placeholder="Search Currencies"
        lightTheme
        round
        onChangeText={text => this.filter(text)}
        autoCorrect={false}
        value={this.state.value}
      />
      );
  };

  render() {
    let comparisonCurrency = this.props.baseCurrency;
    if (this.props.navigation.state.params.type === 'quote') {
      comparisonCurrency = this.props.quoteCurrency;
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" translucent={false} />
        <FlatList
          data={this.state.currenciesList}
          renderItem={({ item }) => (
            <ListItem
              title={item.code + ' - ' + item.text}
              checkmark={item.code === comparisonCurrency}
              onPress={() => this.handlePress(item)}
            />
          )}
          keyExtractor={item => item.code}
          ItemSeparatorComponent={Divider}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  baseCurrency: state.currencies.baseCurrency,
  quoteCurrency: state.currencies.quoteCurrency,
  primaryColor: state.theme.primaryColor,
});

export default connect(mapStateToProps)(CurrencList);
