import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import clientPromise from "@/lib/mongodb";
// import connectMongoDB from "@/lib/mongodb";
import connectMongoDB from "@/app/lib/mongodb";
import Topic from "@/app/models/topic";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      console.log("SignIn Callback Invoked!");
      console.log("Google Profile Data:", profile);

      await connectMongoDB();
      console.log("Connected to MongoDB");

      const user = await Topic.findOne({ email: profile.email });
      if (!user) {
        console.log("User not found, creating a new one...");
   await Topic.create({
  email: profile.email,
  username: profile.email.split("@")[0], // ← This ensures a unique-ish username
  userImage: profile.picture,
  displayName: profile.name,
});
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      // session.user.email = token.email;
      return session;
    },
  },
};
// Default NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
