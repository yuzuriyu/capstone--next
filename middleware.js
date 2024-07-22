export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/achievements",
    "/guide",
    "/contact",
    "/about",
    "/inbox",
    "/settings",
  ],
};
