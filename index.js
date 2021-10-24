const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors')
require('dotenv').config()




// user:- genius-car-mechanic-admin
// password:- ZGPUyux28REjJU9s
const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xjofx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("carMehanic");
        const servicesCollection = database.collection("services");
        // create a document to insert

        // get api
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({})
            const services = await cursor.toArray()
            res.send(services)
        })
        //    get single service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(query)
            res.json(service)
        })

        // post service
        app.post('/services', async (req, res) => {
            const service = req.body;
            const result = await servicesCollection.insertOne(service);
            res.json(result)

        })
            // delete application
        app.delete('/services/:id', async (req, res) => {
                const id = req.params.id
                const query = { _id: ObjectId(id) };
                const result = await servicesCollection.deleteOne(query)
                res.json(result)


            })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);
















app.get('/', (req, res) => {
    res.send('successfully connected')
})

app.listen(port, () => {
    console.log("successfully running on", port)
})
