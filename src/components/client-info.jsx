import React, {Component} from 'react';

const ClientInfo = (props) =>{
    return(
        <div className="flex">
            {
                ( props.current_client_info.pointsOfInterest || [] ).map(poi=>{
                    return (
                    <div key={Math.random()} className="client-info">
                        <div className="client-info-header">
                            <i className="fas fa-map-marker-alt poi-marker-icon margin-right-5"></i><span>{poi.poiName}</span>
                            <i className="far fa-edit edit-icon"></i>
                        </div>
                        <div className="client-info-body">
                            <div>
                                <label><strong>Floor: </strong></label><span className="margin-left-5">{poi.floor}</span>
                            </div>
                            <div>
                                <label><strong>Latitude: </strong></label><span className="margin-left-5">{poi.latitude}</span>
                            </div>
                            <div>
                                <label><strong>Longitude: </strong></label><span className="margin-left-5">{poi.longitude}</span>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default ClientInfo;