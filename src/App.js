import React, { Component } from 'react';
import AddClient from './components/add-client';
import ShowClients from './components/show-clients'
import Axios from 'axios';

// Add name input
class App extends Component {
  constructor(){
    super();
    this.state = {
      longitude: undefined,
      latitude: undefined,
      floor: undefined,
      default_client: '',
      errors: {},
      clients: {},
      poi_name: ''
    }
    this.setValues = this.setValues.bind(this);
    this.changeDefaultClient = this.changeDefaultClient.bind(this);
  }

  componentDidMount(){
    Axios.get('http://localhost:3001/clients')
    .then(res=>{
      if (res.status === 200 && res.data && res.data.result) {
        const clients = res.data.result
        this.setState({clients: clients, default_client: Object.keys(clients)[0] || ''});
      }
    }, err=>{
      console.log(err);
    })
    .finally(()=>{
      this.setState({
        longitude:'',
        latitude: '',
        floor: '',
        poi_name: ''
      })
    })
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

  changeDefaultClient(client_name){
    this.setState({default_client: client_name});
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
            <h1>Harmony Intel Client Onboarding</h1>
          </div>
        </div>

        <div className="body-view">
          <div>
            <div className="clients-view">
              <div>
                <h4>Client List</h4>
              </div>
              <ShowClients clientList={this.state.clients} default_client={this.state.default_client} changeDefaultClient={this.changeDefaultClient} />
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
