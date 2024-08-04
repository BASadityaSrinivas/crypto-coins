"use server";

import client from "@/lib/mongo";

export async function testDatabaseConnection() {
  let isConnected = false;
  try {
    const mongoClient = await client;
    await mongoClient.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    return !isConnected;
  } catch (e) {
    console.error(e);
    return isConnected;
  }
}