const express = require('express');
const app = express();
const port = 3001;
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var uri = "mongodb://gsingh:w9UXfdW736G3U1w7@dashboard-shard-00-00-vupkl.mongodb.net:27017,dashboard-shard-00-01-vupkl.mongodb.net:27017,dashboard-shard-00-02-vupkl.mongodb.net:27017/test?ssl=true&replicaSet=dashboard-shard-0&authSource=admin&retryWrites=true";

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);

app.post('/clients', (req, res)=>{
    const client_name = req.body.name;
    console.log(client_name);
    if(!!client_name){
        MongoClient.connect(uri, (err, client) =>{
            client.db('dashboard_database').collection('HIClients').insertOne({name: client_name}, (err, result)=>{
                if (err) {
                    console.log(err);
                    res.status(500).send({message: 'Adding client failed', error: err});
                } else {
                    res.status(200).send({message: 'Client added successfuly', result: result});
                }
                client.close();
            });
        });
    } else {
        res.status(400).send({message: 'Invalid client name passed'});
    }
})

app.get('/clients', (req,res)=>{
    MongoClient.connect(uri, (err, client)=>{
        if (err) {
            console.log(err);
            res.status(500).send({message: 'Fetching Client list failed'});
        } else {
            const all_clients = client.db('dashboard_database').collection('HIClients').find({}, {name: 1}).toArray();
            all_clients.then(results=>{
                console.log(results);
                const return_payload = {};
                (results || []).forEach(result => {
                    return_payload[result.name] = result;
                });
                res.status(200).send({result: return_payload});
            }, error=>{
                console.log(error);
                res.status(500).send({message: 'Response from server failed', error: error});
            })
            client.close();
        }
    });
})

app.get('/clients/:clientid/pointsOfInterest', (req, res)=>{

})

app.post('/clients/:clientid/pointsOfInterest', (req, res)=>{
    const client_id = req.params.clientid;
    const poi_name = req.body.poi_name;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const floor = req.body.floor;
    
    MongoClient.connect(uri, (err, client) =>{
        client.db('dashboard_database').collection('HIClients').updateOne({_id: ObjectID(client_id)}, 
        {
            $push: {
                pointsOfInterest: {
                    _id: new ObjectID(), 
                    latitude: latitude, 
                    longitude: longitude, 
                    floor: floor, 
                    poiName: poi_name
                }
            }
        },{
            upsert: false
        })
        .then((result)=>{
            console.log(result);
            res.status(200).send({message: 'Update successful'});
        })
        .catch(err=>{
            console.log(err)
            res.status(500);
        })
    });
})

app.post('/createClient', (req,res)=>{
    const data = req.body.data;
    MongoClient.connect(uri, function(err, client) {
        let db = client.db('dashboard_database');
        db.collection('floor_plan_venues').insertOne(data)
        .then((result)=>{
            res.status(200).send(result);
        },(err)=>{
            res.status(500);
        })
        client.close();
    });
})

app.get('/getAllClients', (req, res) => {    
    MongoClient.connect(uri, function(err, client) {
        let db = client.db('dashboard_database');
        db.collection('floor_plan_venues').find().toArray()
        .then((result)=>{
            const formatted_result = {
                clients: {}
            };
            if (result.length) {
                result.forEach((client)=>{
                    formatted_result.clients[client._id] = client;
                });
            }
            res.status(200).send(formatted_result);
        },(err)=>{
            res.status(500);
        })
        client.close();
      });
})

app.post('/insertData', (req, res) => {
    
    let data = req.body.data;
    
    MongoClient.connect(uri, {useNewUrlParser: true}, function(err, client) {
        let db = client.db('dashboard_database');
        
        db.collection('floor_plan_venues').insertMany(data)
         .then(function(result) {
           console.log(result);
         })
      
        client.close();
      });
    res.send(200)
})

app.post('/addvenue', (req, res)=>{
    let data = req.body.data;
    let floor_id = req.body.floor_id;
    let fp_client = req.body.client;
    let building_id = req.body.building_id;

    MongoClient.connect(uri, function(err, client){
        let db = client.db('dashboard_database');
        if (err) {
            console.log(err);
            return res.send(500);
        }
        const filter_key = `buildings.${building_id}.floors.${floor_id}.venues`;
        db.collection('floor_plan_venues').update(
            {},
            { $push: { filter_key: data } }
        )
        .then(function(result) {
           console.log(result);
         })
      
        client.close();
    });
    res.send(200);
})

app.post('/deletevenue', (req, res)=>{
    let venue_id = req.body.venue_id;
    let floor_id = req.body.floor_id;
    let fp_client = req.body.client;
    let building_id = req.body.building_id;

    MongoClient.connect(uri, function(err, client){
        let db = client.db('dashboard_database');
        if (err) {
            console.log(err);
            return res.send(500);
        }
        db.collection('floor_plan_venues').update(
            {},
            { $pull: { "client_location.building_info.$[b].floorplan_info.$[f].venues": {id: venue_id} } },
            { arrayFilters: [ { "b.building_id": building_id } , { "f.floor_level": floor_id } ]}
        )
        .then(function(result) {
           console.log(result);
         })
      
        client.close();
    });
    res.send(200);
})

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))