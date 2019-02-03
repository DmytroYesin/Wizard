import React from 'react';
import { store } from './../store';
import { Dropdown, Accordion, Icon } from 'semantic-ui-react';
import { SingleIp } from './singleIP';
import { IpRange } from './ipRange';
import { CSV } from './CSV';
import { connect } from 'react-redux';


const options = [
  { key: 1, text: 'IP', value: 'IP' },
  { key: 2, text: 'IP Range', value: 'IP Range' },
  { key: 3, text: 'CSV', value: 'CSV' },
]

export class DiscoverySourceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  handleChangeDropdown = (e, { value }) => {
     store.dispatch({type: 'DROPDOWN', payload: value });
   }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state;
    const { inputType } = this.props.state;
    let flags = { flagRange: false, flagIP: false, flagCSV: false };

    if (inputType === 'IP Range'){
      flags = { flagRange: true, flagIP: false, flagCSV: false };
    } else if (inputType === 'IP'){
      flags = { flagRange: false, flagIP: true, flagCSV: false };
    } else if (inputType === 'CSV'){
      flags = { flagRange: false, flagIP: false, flagCSV: true };
    }

      return (
        <div className='discovery_source_cont'>
          <Accordion className='bg discovery_source' styled>
            <Accordion.Title className='text_title' active={activeIndex === 0} index={0} onClick={this.handleClick}>
              <Icon name='dropdown' />
              Discovery Source
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <div>
                <Dropdown
                  onChange={this.handleChangeDropdown}
                  options={options}
                  placeholder='Choose an option'
                  selection
                  fluid
                />
                { flags.flagRange?
                  <IpRange />
                  : null
                }
                { flags.flagIP?
                  <SingleIp />
                  : null
                }
                { flags.flagCSV?
                  <CSV />
                  : null
                }
              </div>
            </Accordion.Content>
          </Accordion>
        </div>
        );
  }
}

export const DiscoverySource = connect(
  state => ({
    state: state
  }),
  dispatch => ({})
)(DiscoverySourceComponent);
