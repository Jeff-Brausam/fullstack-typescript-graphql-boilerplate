import { ApplicationResolverContext } from "../resolvers";
import { QueryResolvers } from "../resolvers-types.generated";

const queryApplicationResolver: QueryResolvers<ApplicationResolverContext> = {
  User: (_, __, { db }) => {
    const [firstUser] = db.getAllUsers();
    if (!firstUser)
      throw new Error(
        "User was requested, but there are no users in the database"
      );
    return firstUser;
  },
  Users: (_, __, { db }) => {
    const users = db.getAllUsers();
    if (!users)
      throw new Error(
        "Users was requested, but there are no users in the database"
      );
    return users;
  },
};

export default queryApplicationResolver;
