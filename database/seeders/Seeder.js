import RoleSeeder from "./RoleSeeder.js";
import UserSeeder from "./UserSeeder.js";

class Seeder {
    async handle() {
        await RoleSeeder.handle();
        await UserSeeder.handle();
    }
}

export default new Seeder();