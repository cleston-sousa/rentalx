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
    const defaultOprions = await getConnectionOptions();

    return createConnection(Object.assign(defaultOprions, { host }));
};
