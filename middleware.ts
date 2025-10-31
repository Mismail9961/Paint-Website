import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protect specific routes
const isProtectedRoute = createRouteMatcher([
  "/my-orders(.*)", // 👈 Protect /my-orders and any nested paths
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // ✅ Await auth to get userId

  // 🚫 Redirect unauthenticated users
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    return Response.redirect(signInUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
