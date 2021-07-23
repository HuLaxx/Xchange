const { MongoClient } = require('mongodb    ')
const mongoose = require("mongoose");
async function main() {
    // const uri = "mongodb+srv://Broodingspace_db:<password>@cluster0.wgsfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const uri = " mongodb://127.0.0.1:27017/"
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();
        const db = client.db('Test');
        const courses = db.collection('Intro').find();
        courses.forEach(function(err, doc) {
            if (err) throw new Error(err);
            if (doc != null) {
                console.log(doc); // Print all documents
            } else {
                db.close(); // Don't forget to close the connection when you are done
            }
        });
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);