<div className="row container">
            <div className="col-md-4">
              <AddClient/>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                  <label htmlFor="poi_name">Point of Interest Name</label>
                  <input onChange={this.setValues} value={this.state.poi_name} className="form-control" id="poi_name" placeholder="POI name" />
                </div>
      
                <div className="form-group">
                  <label htmlFor="latitude">Latitude</label>
                  <input type="number" onChange={this.setValues} value={this.state.latitude} step="any" className="form-control" id="latitude" placeholder="Latitude" />
                </div>
                <div className="form-group">
                  <label htmlFor="longitude">Longitude</label>
                  <input type="number" step="any" onChange={this.setValues} value={this.state.longitude} className="form-control" id="longitude" placeholder="Longitude" />
                </div>
      
                <div className="form-group">
                  <label htmlFor="floor">Floor Level</label>
                  <input type="number" onChange={this.setValues} value={this.state.floor} step="any" min="1" step="1" className="form-control" id="floor" placeholder="Floor level" />
                  <small>{this.state.errors['floor']}</small>
                </div>
          
                <button type="submit" onClick={this.submitPoi.bind(this)} className="btn btn-primary">Submit</button>
              </div>
            <div className="col-md-4">
              <ShowClients clientList={this.state.clients} default_client={this.state.default_client} changeDefaultClient={this.changeDefaultClient} />
            </div>
          </div>