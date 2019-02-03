import React from 'react';
import { connect } from 'react-redux';
import { DiscoverySource } from './components/discoverySource';
import { DiscoveryOptions } from './components/discoveryOption';
import { SelectedOptions } from './components/selectedOptions';
import { Buttons } from './components/buttons';
import { StepsVue } from './components/stepsVue';

class AppComponent extends React.Component {

  render() {
      return (
        <div className='container'>
          <StepsVue />
          <div className='flex_div container'>
            <DiscoverySource />
            { this.props.Step >= 1 ? <DiscoveryOptions /> : null }
          </div>
          <div className='container'>
            { this.props.Step >= 2 ? <SelectedOptions /> : null }
          </div>
          <Buttons />
        </div>
      );
  }
}

export const App = connect(
  state => ({
    Step: state.step
  }),
  dispatch => ({})
)(AppComponent);
