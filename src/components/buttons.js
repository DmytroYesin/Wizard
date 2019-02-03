import React from 'react';
import { store } from './../store';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { ModalWindow } from './modalWindow';


export class ButtonsComponent extends React.Component {

  onClear = () => {
    store.dispatch({type: 'RESET'});
  }

  render() {
      return (
        <div className='container'>
          <Button.Group floated='left'>
            <Button onClick={this.onClear}>Clear</Button>
          </Button.Group>

          { this.props.state.discoverButton ?
            <Button.Group floated='right'>
              <ModalWindow />
            </Button.Group>
             : null }
        </div>
        );
  }
}

export const Buttons = connect(
  state => ({
    state: state
  }),
  dispatch => ({})
)(ButtonsComponent);
