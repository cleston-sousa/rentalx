export default {
    secret_token: process.env.TOKEN_SECRET || "w3e4r5t6y7u8i9o0",
    expires_in_token: process.env.TOKEN_EXPIRES_IN || "15m",
    secret_refresh_token:
        process.env.REFRESH_TOKEN_SECRET || "87y9das809yd0a8hd08fd0hfds",
    expires_in_refresh_token: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
    expires_in_days_refresh_token:
        process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || "30",
};
