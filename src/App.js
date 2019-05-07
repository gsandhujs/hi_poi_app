import React, { Component } from 'react';
import AddClient from './components/add-client';
import ListAllClients from './components/list-clients';
import ClientInfo from './components/client-info';
import Axios from 'axios';

// Add name input
class App extends Component {
  constructor(){
    super();
    this.state = {
      longitude: undefined,
      latitude: undefined,
      floor: undefined,
      current_client: undefined,
      errors: {},
      clients: {},
      poi_name: ''
    }
    this.setValues = this.setValues.bind(this);
    this.changeCurrentClient = this.changeCurrentClient.bind(this);
    this.getAllClientNames = this.getAllClientNames.bind(this);
  }

  componentDidMount(){
    Axios.get('http://localhost:3001/clients')
    .then(res=>{
      if (res.status === 200 && res.data && res.data.result) {
        const clients = res.data.result;
        this.setState({clients: clients, current_client: Object.keys(clients)[0] || ''});
      }
    }, err=>{
      console.log(err);
    })
    // .finally(()=>{
    //   this.setState({
    //     longitude:'',
    //     latitude: '',
    //     floor: '',
    //     poi_name: ''
    //   })
    // })
  }

  /**
   * Returns an array of client names.
   */
  getAllClientNames(){
    return Object.keys(this.state.clients);
  }

  getCurrentClientInfo(){
    const current_client = this.state.current_client;
    return this.state.clients[current_client] || {};
  }

  setValues(e){
    console.log(e.target);
    const state_prop = e.target.id;
    const state_value = e.target.value;
    const error = this.state.errors;
    console.log('type of', typeof state_value);
    if (state_prop === 'floor'){
      if (state_value < 0 || /[^\d]/.test(state_value)) {
        error[state_prop] = 'Floor number should be greater than 0';
      } else {
        delete error[state_prop];
      }
    }

    this.setState({[state_prop]: e.target.value, errors: error});
  }

  changeCurrentClient(client_name){
    this.setState({current_client: client_name});
  }

  submitPoi(){
    const {latitude, longitude, poi_name, floor, default_client} = this.state;
    const client_id = this.state.clients[default_client]._id || '';

    Axios.post(`http://localhost:3001/clients/${client_id}/pointsOfInterest`, {
      latitude: latitude, longitude: longitude, floor: floor, poi_name: poi_name
    }).then((res)=>{
      console.log(res)
    })

  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="header-text">
            <h4>Harmony Intel Client Onboarding</h4>
          </div>
        </div>

        <div className="body-view">
          <div className="clients-list">
            <div>
              <h4>Client List</h4>
            </div>
            <ListAllClients all_clients={this.getAllClientNames()} changeCurrentClient={this.changeCurrentClient} />
          </div>
          <div className="clients-view">
            <ClientInfo current_client_info={this.getCurrentClientInfo()} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
