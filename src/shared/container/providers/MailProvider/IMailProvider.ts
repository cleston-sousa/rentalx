interface IMailProvider {
    sendMail(to: string, subject: string, body: string): Promise<void>;

    sendMailTemplate(
        to: string,
        subject: string,
        path: string,
        variables: any
    ): Promise<void>;
}

export { IMailProvider };
