import React from 'react';
import { store } from './../store';
import { Input, Dropdown, Form, Radio } from 'semantic-ui-react';
import { connect } from 'react-redux';


const options = [
  { key: 1, text: 'Authentication and No Privacy', value: 'Authentication and No Privacy' },
  { key: 2, text: 'Another variant', value: 'Another variant' },
]

export class OptionV3Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleValidation = (val) => {
    const { readCommunity, securityOptions, contextEngineID, contextNAME,
      AuthenticationPassword, code, discoverButton } = this.props.state;
      if(val.length){
        if (!discoverButton) {
          if ( readCommunity.length &&
               securityOptions.length &&
               contextEngineID.length &&
               contextNAME.length &&
               AuthenticationPassword.length &&
               code.length ) {
            store.dispatch({type: 'DISCOVER_BUTTON', payload: true});
          }
        } else {
          if ( !readCommunity.length |
               !securityOptions.length |
               !contextEngineID.length |
               !contextNAME.length |
               !AuthenticationPassword.length |
               !code.length ) {
            store.dispatch({type: 'DISCOVER_BUTTON', payload: false});
          }
        }
      } else {
          store.dispatch({type: 'DISCOVER_BUTTON', payload: false});
      }
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
    store.dispatch({type: 'CODE', payload: value });
    this.handleValidation(value);
  }

  handleOnChange = (e, type) => {
    store.dispatch({type: type, payload: e});
    setTimeout(this.handleValidation(e), 10);
  }

  handleChangeDropdown = (e, { value }) => {
    store.dispatch({type: 'DROPDOWN_V3', payload: value });
    this.handleValidation(value);
  }

  render() {
    // this.handleValidation();
      return (
            <div>
              <div className='text_label'>Read Community</div>
              <Input className='input_bg mb-1' fluid onChange={e => this.handleOnChange(e.target.value, 'READ_COMMUNITY')} />
              <Dropdown
                className='mb-1'
                onChange={this.handleChangeDropdown}
                options={options}
                placeholder='Choose an option'
                selection
                fluid
              />
              <div className='text_label'>Context Name</div>
              <Input className='input_bg mb-1' fluid onChange={e => this.handleOnChange(e.target.value, 'CONTEXT_NAME')} />
              <div className='text_label'>Context Engine ID</div>
              <Input className='input_bg mb-1' fluid onChange={e => this.handleOnChange(e.target.value, 'CONTEXT_ENGINE_ID')} />
              <div className='text_label_big'>Autentication Algorithm</div>
              <Form className='flex_div'>
                <Form.Field className='radioV5'>
                  <Radio
                    label='MD5'
                    name='radioGroup'
                    value='md5'
                    checked={this.state.value === 'md5'}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field className='radioV5'>
                  <Radio
                    label='SHA'
                    name='radioGroup'
                    value='sha'
                    checked={this.state.value === 'sha'}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field className='radioV5'>
                  <Radio
                    label='HMAC128'
                    name='radioGroup'
                    value='hmac128'
                    checked={this.state.value === 'hmac128'}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field className='radioV5'>
                  <Radio
                    label='HMAC192'
                    name='radioGroup'
                    value='hmac192'
                    checked={this.state.value === 'hmac192'}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field className='radioV5'>
                  <Radio
                    label='HMAC256'
                    name='radioGroup'
                    value='hmac256'
                    checked={this.state.value === 'hmac256'}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field className='radioV5'>
                  <Radio
                    label='HMAC384'
                    name='radioGroup'
                    value='hmac384'
                    checked={this.state.value === 'hmac384'}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
              <div className='text_label'>Authentication Password</div>
              <Input className='input_bg mb-1' fluid onChange={e => this.handleOnChange(e.target.value, 'AUTHENTICATION_PASSWORD')} />
            </div>
        );
  }
}

export const OptionV3 = connect(
  state => ({
    state: state
  }),
  dispatch => ({})
)(OptionV3Component);
