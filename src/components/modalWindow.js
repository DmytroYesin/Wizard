import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react'

let initialdata = {
  content: {
    inputType: '',
    CSVpath: '',
    ipAddress: '',
    startIPAddress: '',
    endIPAddress: '',
    snmpConfig: ''
  }
};

export class ModalComponent extends React.Component {

  resultData = () => {
    const type = this.props.state.inputType;
    let data = initialdata;
    data.content.inputType = type;
    if (type === 'IP') {
      delete data.content.startIPAddress;
      delete data.content.endIPAddress;
      delete data.content.CSVpath;
      data.content.ipAddress = this.props.state.ipAddress;
    } else if (type === 'IP Range') {
      delete data.content.ipAddress;
      delete data.content.CSVpath;
      data.content.startIPAddress = this.props.state.ipFrom;
      data.content.endIPAddress = this.props.state.ipTo;
    } else if (type === 'CSV') {
      delete data.content.startIPAddress;
      delete data.content.endIPAddress;
      delete data.content.ipAddress;
      data.content.CSVpath = this.props.state.selectedFile;
    }
    data.content.snmpConfig = this.snmpData();
    return data;
  }

  snmpData = () => {
    let result = {
      version: this.props.state.version,
      snmpv1: this.snmpV1_2('1'),
      snmpv2: this.snmpV1_2('2'),
      snmpv3: this.snmpV3(),
    }
    return result;
  }

  snmpV1_2 = (v) => {
    if ( v === this.props.state.version) {
      return {
        readCommunity: this.props.state.readCommunity,
      }
    } else {
      return null;
    }
  }

  snmpV3 = () => {
    if ( this.props.state.version === '3' ) {
      return {
        readCommunity: this.props.state.readCommunity,
        securityOptions: this.props.state.securityOptions,
        contextNAME: this.props.state.contextNAME,
        contextEngineID: this.props.state.contextEngineID,
        authenticationAlgorithm: {
          code: this.props.state.code,
          password: this.props.state.AuthenticationPassword,
        },
        encryptionAlgorithm: {
          code: ""
        }
      }
    } else {
      return null;
    }
  }

  render() {
    let jsonData = JSON.stringify(this.resultData(), null, '\t');
      return (
        <Modal trigger={<Button className='green'>Discover</Button>}>
          <Modal.Content scrolling content={jsonData} className='multi-line' />
        </Modal>
        );
  }
}

export const ModalWindow = connect(
  state => ({
    state: state
  }),
  dispatch => ({})
)(ModalComponent);
