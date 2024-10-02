import { User } from "./model/User.js";

export const resolvers = {
  Query: {
    users: async () => await User.find(),
    usersByName: async (_, { name }) =>
      await User.find({ name: { $regex: name, $options: "i" } }),
    usersByEmail: async (_, { email }) =>
      await User.find({ email: { $regex: email, $options: "i" } }),
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      const newUser = new User({ name, email });
      try {
        await newUser.save();
        return newUser;
      } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
          throw new Error(`A user with this email address already exists.`);
        }
        if (error.name === "ValidationError") {
          throw new Error("Email address is not valid!");
        }
        throw new Error("An error occurred while saving the user.");
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser === null) {
          throw new Error(`User not found`);
        }
        return deletedUser;
      } catch (error) {
        throw new Error(`An error occurred while deleting the user.`);
      }
    },
  },
};
