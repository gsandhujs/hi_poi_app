import React , {useState} from 'react';

const EditCheckpoint = (props) => {
    const [is_edit, toggleEdit] = useState(false)
    return (
        <div>
            <i className="far fa-edit edit-icon" onClick={()=>toggleEdit(!is_edit)}></i>
            {
                is_edit ? <EditCheckpointForm poi_data={props.poi_data} toggleEdit={toggleEdit} is_edit={is_edit} /> : null
            }
        </div>
    )
}

const EditCheckpointForm = (props) =>{
    return (
        <div className="modal-app">
            <div className="modal-content">
                <div className="modal-header">
                    <i className="fas fa-times close-modal" onClick={()=>{props.toggleEdit(!props.is_edit)}}></i>
                    <span>{props.poi_data.poiName}</span>
                </div>
                <div className="modal-body">
                    <div className="margin-top-15">
                        <label htmlFor="poi_name"><strong>Point Of Interest Name: </strong></label>
                        <input value={props.poi_data.poiName} id="poi_name"/>
                    </div>
                    
                    <div className="margin-top-15">
                        <label htmlFor="latitude"><strong>Latitude: </strong></label>
                        <input value={props.poi_data.latitude} id="latitude"/>
                    </div>
                    
                    <div className="margin-top-15">
                        <label htmlFor="longitude"><strong>Longitude: </strong></label>
                        <input value={props.poi_data.longitude} id="longitude"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCheckpoint;