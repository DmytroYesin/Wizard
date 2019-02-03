import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { SNMPOption } from './SNMPOption';
import { connect } from 'react-redux';

export class SelectedOptionsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state;
      return (
        <Accordion className='bg selected_options' styled>
          <Accordion.Title className='text_title' active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
            Selected Options
          </Accordion.Title>
          <Accordion.Content className='text_white' active={activeIndex === 0}>
            { this.props.state.SNMP ? <SNMPOption /> : null }
            { this.props.state.Link ? null : null }
            { this.props.state.VLAN ? null : null }
            { this.props.state.Ports ? null : null }
          </Accordion.Content>
        </Accordion>
        );
  }
}

export const SelectedOptions = connect(
  state => ({
    state: state
  }),
  dispatch => ({})
)(SelectedOptionsComponent);
