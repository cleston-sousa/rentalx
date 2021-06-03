import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "@shared/infra/typeorm";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidv4();
    const pass = await hash("admin", 8);

    await connection.query(
        `insert into users
        (id,name,email,password,driver_license, is_admin,created_at)
        values
        ( '${id}', 'admin', 'admin@local','${pass}','XXX-XXXX', true, 'now()' )`
    );

    await connection.close();
}

create().then(() => console.log("user admin created"));
