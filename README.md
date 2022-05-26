## Fullstack React Typescript GraphQL Boilerplate

Fullstack React application with Typescript and GraphQL. MSW for testing with mocks with React.

### Setup

1. Install the dependencies with

```
yarn
```

2. Start the application with

```
yarn start
```

### Testing

For testing with the frontend this project is using MSW. This is able to mock your server and act as a service worker on the client side giving you mocked data.

If you are working in the client directory run

```
yarn start-msw
```

To begin testing run

```
yarn test
```

### Things to know

#### Adding dependencies with lerna

When you want to add a dependency to the server or client, run lerna add <package name> <directory installing into>. For example: lerna add jest server.

#### Updating types with codegen

Anytime you create or update a resolver, graphql, or a mutation, you should update it with codegen on both the server and clientside. On the server side: After editing run:

```
cd ../server
yarn codegen
```

On the client side run:

```
cd ../client
yarn codegen
```

You will not be able to use your query or mutation until after the gql tag is created/updated either on the client side so do that first before running it.

Sometimes typescript in your IDE will break after that (known bug). If that happens just restart typescript or your IDE. If you are using VS-Code just press CMD + Shift + P and enter 'Typescript restart'

#### LowDb

LowDB is a lightweight database. If you are looking for scalability, switch to a better database like Mongodb or PostgreSQL. It is only used on this project because it is quick and easy to setup.
