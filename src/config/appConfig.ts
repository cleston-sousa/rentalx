export default {
    minimum_rent_days: process.env.MINIMUM_RENT_DAYS || `${1}`,
    recovery_password_expiration:
        process.env.RECOVERY_PASSWORD_EXPIRATION || `${3 * 60 * 60}`,

    app_email_sender:
        process.env.APP_EMAIL_SENDER || `fake-no-reply@rentx.local`,
};
