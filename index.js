const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    users: [User]
    tasks: [Task]
  }

  type User {
    id: ID!
    username: String!
  }

  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }
`;

// Mock data
const mockUsers = [
  { id: "1", username: "user1" },
  { id: "2", username: "user2" },
];

const mockTasks = [
  { id: "1", title: "Task 1", completed: false },
  { id: "2", title: "Task 2", completed: true },
];

const resolvers = {
  Query: {
    hello: () => "Hello, World!",
    users: () => mockUsers,
    tasks: () => mockTasks,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  app.get("/users", (req, res) => {
    res.json(mockUsers);
  });

  app.get("/tasks", (req, res) => {
    res.json(mockTasks);
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
