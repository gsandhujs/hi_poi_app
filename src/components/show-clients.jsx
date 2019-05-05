import React , {Component} from 'react';

class ShowClients extends Component {
    changeClient(client_name){
        this.props.changeDefaultClient(client_name);
    }

    render(){
        return (
            <div>
                <ul>
                    {Object.keys(this.props.clientList).map(client_name=>{
                        return <li key={this.props.clientList[client_name]._id} onClick={()=>this.changeClient(client_name)} >{client_name}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default ShowClients;