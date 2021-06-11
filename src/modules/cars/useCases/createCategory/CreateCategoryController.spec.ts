import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("create category controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();
        const pass = await hash("admin", 8);

        await connection.query(
            `insert into users (id,name,email,password,driver_license, is_admin,created_at) values ('${id}', 'admin', 'admin@local','${pass}','XXX-XXXX', true, 'now()' )`
        );
    });
    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("givenCategoryName_with_whenPostCategories_returnStatus201Category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@local",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "category supertest",
                description: "category supertest description",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });

    it("givenCategoryName_withDuplicatedName_whenPostCategories_returnStatus400", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@local",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "category supertest",
                description: "category supertest description",
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(400);
    });
});
