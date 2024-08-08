export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/profile/:username*",
    "/achievements",
    "/guide",
    "/contact",
    "/about",
    "/inbox",
    "/settings",
  ],
};
