import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import Username from "@/app/[username]/page";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],


  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == 'github') {
        //connect to the databas
        const client = await mongoose.connect("mongodb://localhost:27017/chai")
        //check if the user already exists in the database
        const currentUser = User.findone({ email: email })
        if (!currentUser) {
          //create a new user
          const newUser = new User({
            email: email,
            Username: email.split("@")[0],
          })
          await newUser.save()
          user.name = newUser.username
        }
        else {
          user.name = newUser.username
        }
      }
    }
  }

};


export { authOptions as GET, authOptions as POST };