import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./model/typedefs.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error);
    process.exit(1);
  }
}

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
    });
    console.log(`Server is running at: ${url}`);
  } catch (error) {
    console.error("Error while starting the Apollo Server:", error);
    process.exit(1);
  }
}

async function startServer() {
  await connectToMongoDB();
  await startApolloServer();
}

startServer();
