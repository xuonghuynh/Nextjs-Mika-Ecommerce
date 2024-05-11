/** 
* An array of routes that can be accessed without authentication
*/

export const publicRoutes = [
    "/product",
    "/about",
    "/collections",
    "/verify-email",
    "/api/uploadthing",
    "/api/collection",
    "/api/webhook",
    "/search",
    "/cart",
]

/**
* An array of routes that use for authentication
*/

export const authRoutes = [
    "/login",
    "/register",
    "/login-error",
    "/forgot-password",
    "/new-password",
]

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_ADMIN_LOGIN_REDIRECT = "/dashboard"
export const DEFAULT_USER_LOGIN_REDIRECT = "/"