import React from 'react';
import { connect } from 'react-redux';
// import { store } from './../store';
import { Step } from 'semantic-ui-react';

let step = ['disabled', 'disabled', 'disabled', 'disabled'];

class StepsVueComponent extends React.Component {



  // handleStep = () => {
  //   const { Step } = this.props;
  //   this.setState({ step1: Step });
  //   console.log('updated ' + Step);
  //
  // //  this.setState({ activeIndex: newIndex })
  // }

  render() {
    let lvl = this.props.Step;
    step[lvl]= 'active';
    if(lvl > 0){
      for(let i = lvl-1; i >= 0; i--) {
        step[i]='';
      }
    }
    if(lvl < 3){
      for(let i = lvl+1; i <= 3; i++) {
        step[i]='disabled';
      }
    }
      return (
        <Step.Group widths={5}>
          <Step className={'one step_style ' + step[0]}>Discovery Source</Step>
          <Step className={'two step_style ' + step[1]}>Discovery Options</Step>
          <Step className={'three step_style ' + step[2]}>Discovery Input Data</Step>
          <Step className={'four step_style ' + step[3]}>Summary</Step>
          <Step className='display_non' />
        </Step.Group>
      );
  }
}

export const StepsVue = connect(
  state => ({
    Step: state.step
  }),
  dispatch => ({})
)(StepsVueComponent);
