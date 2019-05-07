import React, {Component} from 'react';

const ClientInfo = (props) =>{
    return(
        <div>
            {
                ( props.current_client_info.pointsOfInterest || [] ).map(poi=>{
                    return (
                    <div key={Math.random()}>
                        <label>Floor: </label><span>{poi.floor}</span><br/>
                        <label>Latitude: </label><span>{poi.latitude}</span><br/>
                        <label>Longitude: </label><span>{poi.longitude}</span>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default ClientInfo;