import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@Entity("cars_image")
class CarImage {
    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    car: Car;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
            this.created_at = new Date();
        }
    }
}

export { CarImage };
