import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import User from "../../../models/userModel";
const bcrypt = require("bcryptjs");
import { Constants } from "../../../Constants";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        //db look up
        try {
          if (!mongoose.connections[0].readyState) {
            mongoose.connect(Constants.dbLink, {}); //Database connection using constant value
            const user = await User.findOne({ email: credentials.email });
          }

          const user = await User.findOne({ email: credentials.email });
          console.log(user);
          if (await bcrypt.compare(credentials.password, user.password)) {
            return {
              id: user._id,
              name: user.fullname,
              email: user.email,
              balance: user.balance,
              plan: user.plan,
              planActive: user.planActive,
              savingsAmount: user.savingsAmount,
            };
          }
        } catch (error) {
          console.log(error);
          const errorMessage = e.response.data.message;
          // Redirecting to the login page with error message in the URL
          throw new Error(errorMessage + "&email=" + credentials.email);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // Getting the JWT token from API response
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.balance = user.balance;
        token.plan = user.plan;
        token.planActive = user.planActive;
        token.savingsAmount = user.savingsAmount;
      }

      return token;
    },

    session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.email = token.email;
        session.name = token.name;
        session.balance = token.balance;
        session.plan = token.plan;
        session.planActive = token.planActive;
        session.savingsAmount = token.savingsAmount;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "ijsuhushbhsjdsibnuijk",
    encryption: true,
    signingKey: "ijsuhushbhsjdsibnuijk",
    encryptionKey: "ijsuhushbhsjdsibnuijk",
  },
  pages: {
    signIn: "/Login",
    error: "/Login", // Changing the error redirect page to our custom login page
  },
});
