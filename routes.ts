/** 
* An array of routes that can be accessed without authentication
*/

export const publicRoutes = [
    "/",
    "/about"
]

/**
* An array of routes that use for authentication
*/

export const authRoutes = [
    "/login",
    "/register"
]

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"