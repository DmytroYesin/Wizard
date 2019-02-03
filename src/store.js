import { createStore } from 'redux'

const initialState = {
  inputType: '',
  ipAddress: '',
  ipFrom: '',
  ipTo: '',
  discoverButton: false,
  step: 0,
}

function changeStr(state, action) {
  switch (action.type) {
    case 'INPUT_IP':
      return { ...state, ipAddress: action.payload };
    case 'INPUT_IP_FROM':
      return { ...state, ipFrom: action.payload };
    case 'INPUT_IP_TO':
      return { ...state, ipTo: action.payload };
    case 'DROPDOWN':
      return { ...initialState, inputType: action.payload };
    case 'STEP':
      return { ...state, step: action.payload };
    case 'SELECTED_FILE':
      return { ...state, selectedFile: action.payload };

    case 'SNMP':
      return { ...state, SNMP: !state.SNMP };
    case 'Link':
      return { ...state, Link: !state.Link };
    case 'VLAN':
      return { ...state, VLAN: !state.VLAN };
    case 'Ports':
      return { ...state, Ports: !state.Ports };

    case 'VERSION':
      return { ...state, version: action.payload };
    case 'READ_COMMUNITY':
      return { ...state, readCommunity: action.payload };
    case 'DROPDOWN_V3':
      return { ...state, securityOptions: action.payload };
    case 'CONTEXT_NAME':
      return { ...state, contextNAME: action.payload };
    case 'CONTEXT_ENGINE_ID':
      return { ...state, contextEngineID: action.payload };
    case 'AUTHENTICATION_PASSWORD':
      return { ...state, AuthenticationPassword: action.payload };
    case 'CODE':
      return { ...state, code: action.payload };
    case 'DISCOVER_BUTTON':
      return { ...state, discoverButton: action.payload };

    case 'RESET':
      return { ...initialState };
    case 'RESET_V3':
      return { ...state, readCommunity: '', contextNAME: '', contextEngineID: '', securityOptions: '',
                AuthenticationPassword: '', code: '', discoverButton: false };
    default:
      return state;
  }
}
export const store = createStore(changeStr, initialState);
