import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

function Fragment(props) {
  return props.children;
}

export class LanguageProvider extends PureComponent {
  static propTypes = {
    locale: PropTypes.string,
    messages: PropTypes.object,
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <IntlProvider
        key={this.props.locale}
        locale={this.props.locale}
        messages={this.props.messages[this.props.locale]}
        textComponent={Fragment}
      >
        {this.props.children}
      </IntlProvider>
    );
  }
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
);

export default connect(mapStateToProps)(LanguageProvider);
