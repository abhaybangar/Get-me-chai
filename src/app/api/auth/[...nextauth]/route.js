import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "../../../../../model/User.js";

let cachedConnection = null;

async function connectToDatabase() {
  if (!cachedConnection) {
    cachedConnection = mongoose.connect(process.env.MONGODB_URI);
  }

  return cachedConnection;
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],


  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        const userEmail = user.email || profile?.email;
        const username = userEmail?.split("@")[0] || profile?.login || user.name;

        if (username) {
          user.name = username;
        }

        if (userEmail) {
          try {
            await connectToDatabase();

            const currentUser = await User.findOne({ email: userEmail });
            if (!currentUser) {
              const newUser = new User({
                email: userEmail,
                name: user.name,
                username,
                profilepic: user.image,
              });

              await newUser.save();
              user.name = newUser.username;
            }
            else {
              user.name = currentUser.username;
            }
          }
          catch (error) {
            console.error("Unable to sync GitHub user:", error);
          }
        }
      }

      return true;
    }
  }

};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
