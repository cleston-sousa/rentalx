import { Connection, createConnection, getConnectionOptions } from "typeorm";

// docker config
/*
interface IOptions {
    host: string;
}
getConnectionOptions().then((options) => {
    const newOptions = options as IOptions;
    newOptions.host = "database";
    createConnection({
        ...options,
    });
});
*/

// local config
/*
createConnection();
*/

// export config
export default async (host = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    let testOptions = {};

    if (process.env.NODE_ENV === "test") {
        testOptions = {
            host: "localhost",
            database: "rentx_test",
        };
    }

    const connOptions = Object.assign(defaultOptions, { host }, testOptions);

    return createConnection(connOptions);
};
