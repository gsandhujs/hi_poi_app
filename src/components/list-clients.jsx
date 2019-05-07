import React , {Component} from 'react';

const ListAllClients = (props) => {
    return (
        <div>
            <ul>
                {
                    props.all_clients.map(client_name=>{
                    return <li key={Math.random()} onClick={()=>props.changeCurrentClient(client_name)} 
                            className="list-items">{client_name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default ListAllClients;