import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://travelingWithSimon:donSIMEON1986@simon.9joh9fs.mongodb.net/travelingWithSimon";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    await client.connect();

    await fetchBlogPosts(client, "BlogPosts");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

/**
 * Fetch and print all documents from the specified collection
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 * @param {string} collectionName The name of the collection to fetch documents from
 */

async function fetchBlogPosts(client, collectionName) {
  try {
    const database = client.db("travelingWithSimon");
    const collection = database.collection(collectionName);
    const blogPosts = await collection.find({}).toArray();

    console.log(`Documents in the "${collectionName}" collection:`);
    console.log(blogPosts);
  } catch (e) {
    console.error(`Failed to fetch documents: ${e}`);
  }
}
