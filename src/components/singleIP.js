import React from 'react';
import { store } from './../store';
import { Input } from 'semantic-ui-react';


const ipRegex = '^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$'


export class SingleIp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validate: true,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e, type) {
    if(e.search(ipRegex) === 0){
      store.dispatch({type: type, payload: e});
      this.setState({validate: true});
      store.dispatch({type: 'STEP', payload: 1});
    } else {
      store.dispatch({type: type, payload: ''});
      this.setState({validate: false});
      store.dispatch({type: 'STEP', payload: 0});
    }
  }

  render() {
      return (
            <div>
              <div className='text_label'>IP</div>
              <Input className='input_bg' fluid onChange={e => this.handleOnChange(e.target.value, 'INPUT_IP')} />
              { this.state.validate ? <div className='input_error' /> :
              <div className='input_error'>Invalid IP, IP Address must contain 4 numbers from 0 to 255 separated by dots</div>}
            </div>
        );
  }
}
