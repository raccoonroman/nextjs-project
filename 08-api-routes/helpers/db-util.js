import { MongoClient } from 'mongodb';

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb://roman:${process.env.MONGODB_PASSWORD}@cluster0-shard-00-00.pgdxj.mongodb.net:27017,cluster0-shard-00-01.pgdxj.mongodb.net:27017,cluster0-shard-00-02.pgdxj.mongodb.net:27017/?ssl=true&replicaSet=atlas-eam7ge-shard-0&authSource=admin&appName=Cluster0`,
  );
  return client;
};

export const insertDoc = async (client, collection, document) => {
  const db = client.db('nextjs');
  const result = await db.collection(collection).insertOne(document);
  return result;
};
