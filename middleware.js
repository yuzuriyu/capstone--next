export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/profile/:username*",
    "/guide",
    "/contact",
    "/about",
    "/inbox",
    "/settings",
  ],
};
