import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";
import cors from "micro-cors";
import "reflect-metadata";
import * as tq from "type-graphql";
import { context } from "./context";
import { resolvers } from "@generated/type-graphql";
import RandomCoachResolver from "./RandomCoachResolver";

const schema = await tq.buildSchema({
  resolvers: [...resolvers, RandomCoachResolver],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  context,
});

let apolloServerHandler: NextApiHandler;

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await apolloServer.start();

    apolloServerHandler = apolloServer.createHandler({
      path: "/api",
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler();

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};

export default cors()(handler);
