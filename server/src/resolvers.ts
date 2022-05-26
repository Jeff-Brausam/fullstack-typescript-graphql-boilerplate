import Db from "./db";
import { Resolvers } from "./resolvers-types.generated";
import queryApplicationResolver from "./resolvers/Query";
import mutationApplicationResolver from "./resolvers/Mutation";

export interface ApplicationResolverContext {
  db: Db;
}
const resolvers: Resolvers<ApplicationResolverContext> = {
  Query: queryApplicationResolver,
  Mutation: mutationApplicationResolver,
};

export default resolvers;
