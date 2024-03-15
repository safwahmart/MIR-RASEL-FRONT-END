// import { baseUrl } from '@/api/apiConfig';
// import axios from 'axios';
import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
const options = {
    providers: [
        FacebookProvider({
          clientId: '939843067537022',
          clientSecret: '2aa4c573a74248d73261fc55036e01ce'
        }),
        GoogleProvider({
          clientId: '1013938621674-s3n8l2jj2vugna4gb7pmp0o3l3trvvns.apps.googleusercontent.com',
          clientSecret: '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',
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        }),
    ],
    session: {
      // Use JSON Web Tokens for session instead of database sessions.
      // This option can be used with or without a database for users/accounts.
      // Note: `jwt` is automatically set to `true` if no database is specified.
      jwt: true,
  
      // Seconds - How long until an idle session expires and is no longer valid.
      // maxAge: 30 * 24 * 60 * 60, // 30 days
  
      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      // updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
      async jwt({ token, user, account }) {
        // Persist the OAuth access_token to the token right after signin
      console.log('first',account)
        if (account) {
          token.id_token = account.id_token;
        }
        return token;
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token from a provider.
        session.id_token = token.id_token;
        return session;
      },
    }
}

export default (req, res) => NextAuth(req, res, options)