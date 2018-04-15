/*
 *
 * LanguageToggle
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Radio } from 'antd';
import { FormattedMessage } from 'react-intl';

import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { appLocales } from '../../i18n';
import messages from './messages';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export class LocaleToggle extends PureComponent {
  render() {
    return (
      <RadioGroup
        defaultValue={this.props.locale}
        onChange={this.props.onLocaleToggle}
      >
        {appLocales.map(locale => (
          <RadioButton key={locale} value={locale}>
            <FormattedMessage {...messages[locale]}/>
          </RadioButton>
        ))}
      </RadioGroup>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
);

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (evt) => dispatch(changeLocale(evt.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
