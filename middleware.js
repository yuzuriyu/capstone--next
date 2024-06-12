export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/profile",
    "/achievements",
    "/guide",
    "/contact",
    "/about",
    "/inbox",
  ],
};
