const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4001;
const connection = process.env.MONGODB_URI || "mongodb+srv://Broodingspace_db:Pragalbh17@cluster0.m8z6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || "mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb";

const localhostConnection = "localhost:27017";
app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//     const client = new MongoClient(url, { useUnifiedTopology: true, useUnifiedTopology: true });
//     res.send('<h2 style="disply:flex; justify-content:center;">Server Running</h2>');

// })


// app.listen(PORT, () => {
//     console.log("Server is Running on :", PORT);
//     const uri = "mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb";
//     const uri = "mongodb+srv://Broodingspace_db:Pragalbh1@cluster0.wgsfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//     mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, result) => {
//         if (!error) {
//             const doc = { name: "Neapolitan pizza", shape: "round" };
//             const result = Collection.insertOne(doc);
//             console.log(
//                 `A document was inserted with the _id: ${result.insertedId}`,
//             );
//         } else {
//             console.log("Something went wrong : " + { error });
//         }
//     })
// })

async function main() {
    // const uri = "mongodb+srv://Broodingspace_db:<password>@cluster0.wgsfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const uri = " mongodb://127.0.0.1:27017/Test"
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        var connection = mongoose.connection;
        connection.db.collection("Intro", function(err, collection) {
            collection.find({}).toArray(function(err, data) {
                console.log(data); // it will print your collection data
            })
        });
    } catch (err) {
        console.error(err);
    }

}

main().catch(console.error);