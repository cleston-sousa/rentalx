import { createConnection, getConnectionOptions } from "typeorm";

// docker config
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

// local
// createConnection();
