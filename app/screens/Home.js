import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectAlert } from '../components/Alert';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Button';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import i18n from '../config/i18n';
import environment from '../config/environment';
import async from 'async';
import { swapCurrency, changeCurrencyAmount, getInitialConversionn } from '../actions/currencies';

class Home extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
    currencyError: PropTypes.string,
  };

  async componentDidMount() {
    const self = this;
    navigator.geolocation.getCurrentPosition(
      position => {
        try {
          let latLongString = `${position.coords.latitude},${position.coords.longitude}`;
          async.waterfall([
            function fetchCurrentLocation(done) {
              fetch(`${environment.reverseGeoCodingUrl}/REST/v1/locations/${latLongString}?o=json&incl=ciso2&key=`)
                .then(function(response) {
                  return response.json();
                })
                .then(locationJson => {
                  done(null, locationJson.resourceSets[0].resources[0].address.countryRegionIso2);
                })
            },
            function getCurrencyBasedOnLocation(location, done) {
              fetch(`${environment.countryCurrencyUrl}//rest/v2/alpha?codes=${location}&fields=currencies`)
                .then(function(response) {
                  return response.json();
                })
                .then(parsedJson => {
                  const localCurrency = parsedJson[0].currencies[0].code;
                  self.props.dispatch(getInitialConversionn(localCurrency));
                  done(null, localCurrency);
                });
            }
          ],
          function (error) {
            if (error) {
              throw new Error(error);
            }
          });
        } catch(error) {
          if (error) {
            throw new Error(error);
          }
        }
      }
    );
  }
  componentWillUnmount() {
    // Do the unmounting. Reset location tracking
    navigator.geolocation.stopObserving();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
      this.props.alertWithType('error', 'Error', nextProps.currencyError);
    }
  }
  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: i18n.t('BASE_CURRENCY'), type: 'base' });
  }

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: i18n.t('QUOTE_CURRENCY'), type: 'quote' });
  }

  handleTextChange = (amount) => {
    this.props.dispatch(changeCurrencyAmount(amount));
  };

  handleSwapCurrencies = () => {
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options', { title: 'Options' });
  };

  render() {
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if (this.props.isFetching) {
      quotePrice = '...';
    }
    return (
      <Container
        backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header
          onPress={this.handleOptionsPress}
        />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={this.props.primaryColor} />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
            textColor={this.props.primaryColor}
          />
          <InputWithButton
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            value={quotePrice}
            editable={false}
            textColor={this.props.primaryColor}
          />
          <LastConverted
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            date={this.props.lastConvertedDate}
            conversionRate={this.props.conversionRate}
          />
          <ClearButton
            text={i18n.t('HOME.REVERSE')}
            onPress={this.handleSwapCurrencies}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
