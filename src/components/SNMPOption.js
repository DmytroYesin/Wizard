import React from 'react';
import { store } from './../store';
import { Accordion, Form, Radio, Icon, Input } from 'semantic-ui-react';
import { OptionV3 } from './optionV3';

export class SNMPOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
    store.dispatch({type: 'VERSION', payload: value });
    store.dispatch({type: 'RESET_V3'});
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleOnChange = (e, type) => {
      store.dispatch({type: type, payload: e});
      if(e.length){
        store.dispatch({type: 'DISCOVER_BUTTON', payload: true});
      } else {
        store.dispatch({type: 'DISCOVER_BUTTON', payload: false});
      }
  }

  render() {
    const { activeIndex } = this.state;
      return (
        <Accordion className='bg selected_options' styled>
          <Accordion.Title className='text_title_big' active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
            SNMP Version
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form className='flex_div'>
              <Form.Field className='radioV3'>
                <Radio
                  label='V1'
                  name='radioGroup'
                  value='1'
                  checked={this.state.value === '1'}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field className='radioV3'>
                <Radio
                  label='V2'
                  name='radioGroup'
                  value='2'
                  checked={this.state.value === '2'}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field className='radioV3'>
                <Radio
                  label='V3'
                  name='radioGroup'
                  value='3'
                  checked={this.state.value === '3'}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>

            { this.state.value === '2' | this.state.value === '1' ?
            <div>
              <div className='text_label'>Read Community</div>
              <Input className='input_bg' fluid onChange={e => this.handleOnChange(e.target.value, 'READ_COMMUNITY')} />
            </div>
            : null }

            { this.state.value === '3' ?
            <OptionV3 />
            : null }
          </Accordion.Content>
        </Accordion>
        );
  }
}
