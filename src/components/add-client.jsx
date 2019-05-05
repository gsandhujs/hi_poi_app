import React, {Component} from 'react';
import Axios from 'axios';

class AddClient extends Component {
    constructor(){
        super();
        this.state = {
            name: undefined
        }
        this.setValues = this.setValues.bind(this);
        this.addClient = this.addClient.bind(this);
    }

    setValues(e){
        const name = e.target.value;
        this.setState({name});
    }
    
    addClient(){
        const name = this.state.name;
        Axios.post('http://localhost:3001/clients', {name})
        .then(res=>{
            console.log(res);
        })
        .finally(()=>{
            this.setState({name: ''})
        })
    }

    render(){
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="name">Client Name</label>
                    <input onChange={this.setValues} className="form-control" id="name" placeholder="Add client name" />
                </div>
            
                <button type="submit" disabled={!this.state.name} onClick={this.addClient} className="btn btn-primary">Add</button>
            </div>
        )
    }
}

export default AddClient;