import React from 'react';
import { store } from './../store';
import { Accordion, Checkbox, Icon } from 'semantic-ui-react';


export class DiscoveryOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleChange = (id) => {
    store.dispatch({ type: id, payload: id });
    let { SNMP, Link, VLAN, Ports} = store.getState();
    if ( SNMP | Link | VLAN | Ports ) {
      store.dispatch({ type: 'STEP', payload: 2 });
    } else {
      store.dispatch({ type: 'STEP', payload: 1 });
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
  const { activeIndex } = this.state
      return (
        <div className='discovery_options_cont'>
          <Accordion className='bg discovery_options' styled>
            <Accordion.Title className='text_title' active={activeIndex === 0} index={0} onClick={this.handleClick}>
              <Icon name='dropdown' />
              Discovery Options
            </Accordion.Title>
            <Accordion.Content className='text_white' active={activeIndex === 0}>
              <div>
                <Checkbox label='SNMP' id='SNMP' onChange = {e => this.handleChange(e.target.id)}/> <br />
                <Checkbox label='Link' id='Link' onChange = {e => this.handleChange(e.target.id)}/> <br />
                <Checkbox label='VLAN' id='VLAN' onChange = {e => this.handleChange(e.target.id)}/> <br />
                <Checkbox label='Ports' id='Ports' onChange = {e => this.handleChange(e.target.id)}/>
              </div>
            </Accordion.Content>
          </Accordion>
        </div>
        );
  }
}
