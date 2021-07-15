const { MongoClient } = require('mongodb')

async function main() {
    const uri = "mongodb+srv://Broodingspace_db:<password>@cluster0.wgsfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);