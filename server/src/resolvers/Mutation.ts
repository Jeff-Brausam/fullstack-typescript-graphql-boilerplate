import { ApplicationResolverContext } from "../resolvers";
import { MutationResolvers } from "../resolvers-types.generated";

const mutationApplicationResolver: MutationResolvers<ApplicationResolverContext> =
  {
    async createUser(_parent, args, { db }) {
      const { name } = args;
      const user = await db.createUser({
        name,
        avatarUrl: "",
      });
      return user;
    },
    async editUser(_parent, args, { db }) {
      const { userId, name } = args;
      const user = await db.editUser(userId, name);
      return user;
    },
    async deleteUser(_parent, args, { db }) {
      const { userId } = args;
      await db.deleteUser(userId);
      return userId;
    },
  };
export default mutationApplicationResolver;
