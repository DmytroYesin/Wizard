import React from 'react';
import { store } from './../store';
import { Input } from 'semantic-ui-react';

const ipRegex = '^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$';

export class IpRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validate: true,
      INPUT_IP_FROM: true,
      INPUT_IP_TO: true
    };
  }

  handleOnChange = (e, type) => {
    if(e.search(ipRegex) === 0){
      store.dispatch({type: type, payload: e});
      this.setState({[type]: true});
      this.checkRange();
    } else {
      store.dispatch({type: type, payload: ''});
      this.setState({[type]: false});
      this.checkRange();
    }
  }

  f = (str) => {
    let found = {};
    let n = 0;
    let numb = 0;
    for(let i = 0; i < str.length; i++) {
      if(str[i] !== '.') {
        numb = numb*10 + Number(str[i]);
      } else {
        found[n] = numb;
        numb = 0;
        n++;
      }
      if(i+1 === str.length) {
        found[n] = numb;
        numb = 0;
      }
    }
    return found;
  }

  checkRange = () => {
    let ipfrom = store.getState().ipFrom;
    let ipto = store.getState().ipTo;
    if (ipfrom.length && ipto.length) {
        let from = this.f(ipfrom);
        let to = this.f(ipto);
        if (to[0] > from[0] | to[1] > from[1] | to[2] > from[2] | to[3] > from[3]){
          this.setState({ validate: true });
          store.dispatch({type: 'STEP', payload: 1});
        } else {
          this.setState({ validate: false });
          store.dispatch({type: 'STEP', payload: 0});
        }
    } else {
      store.dispatch({type: 'STEP', payload: 0});
    }
  }

  render() {
      return (
          <div>
            <div>
              <div className='text_label'>Starting IP Address</div>
              <Input className='input_bg' fluid onChange={e => this.handleOnChange(e.target.value, 'INPUT_IP_FROM')} />
              { this.state.INPUT_IP_FROM? <div className='input_error' /> :
                <div className='input_error'>Invalid IP, IP Address must contain 4 numbers from 0 to 255 separated by dots</div>}
            </div>
            <div>
              <div className='text_label'>Ending IP Address</div>
              <Input className='input_bg' fluid onChange={e => this.handleOnChange(e.target.value, 'INPUT_IP_TO')} />
              { this.state.INPUT_IP_TO ? <ErrorSpan validate={this.state.validate} /> :
                <div className='input_error'>Invalid IP, IP Address must contain 4 numbers from 0 to 255 separated by dots</div>}
            </div>
          </div>
        );
  }
}

class ErrorSpan extends React.Component {
  render() {
    return (
      <div>
        { this.props.validate ?
          <div className='input_error' /> :
          <div className='input_error'>Ending IP must be larger than the starting IP</div> }
      </div>
    )
  }
}
