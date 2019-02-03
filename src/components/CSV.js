import React from 'react';
import { store } from './../store';
import { Input } from 'semantic-ui-react';


export class CSV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
      this.setState({path: e });
      store.dispatch({type: 'SELECTED_FILE', payload: e});
      store.dispatch({type: 'STEP', payload: 1});
  }

  render() {
      return (
        <div>
          <div className='upload_component'>
            <div className='upload_container'>
              <Input label='Select a file' type='file' className='upload_input' fluid onChange={e => this.handleOnChange(e.target.value)} />
            </div>
          </div>
          { this.state.path.length > 0 ?
            <div className='selected_file'>Selected file: {this.state.path}</div>
          : <div className='selected_file' /> }
        </div>
        );
  }
}
