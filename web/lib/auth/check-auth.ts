// import { IncomingMessage } from "http";
// import { useAuth } from "@/hooks/use-admin";

// export const checkAuthFromRequest = async (req: IncomingMessage) => {
//   const cookies = req.headers.cookie;

//   if (!cookies) return false;

//   // Example: extract session token
//   const token = cookies
//     .split("; ")
//     .find((c) => c.startsWith("session="))
//     ?.split("=")[1];

//   if (!token) return false;

//   // Replace this with your real validation
//   return validateSession(token);
// };

// // /lib/auth/checkAuth.ts
// export const checkAuth = async (ctx: any) => {
//   return checkAuthFromRequest(ctx.req);
// };
// Placeholder for session validation logic
