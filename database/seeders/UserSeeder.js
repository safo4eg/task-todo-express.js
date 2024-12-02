import User from '../../app/models/User.js';
import Role from '../../app/models/Role.js';
import bcryptjs from 'bcryptjs';
class UserSeeder {
    async handle() {
        try {
            const role = await Role.findOne({title: 'Admin'});

            if(!role) {
                console.log('Роль Admin не найдена');
                return;
            }

            const admin = await User.findOne({role: role._id});

            if(admin) {
                console.log('Админ уже существует');
                return;
            } else {
                const adminData = {
                    username: 'admin',
                    password: bcryptjs.hashSync('admin', 7),
                    role: role._id
                }

                await User.create(adminData);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UserSeeder();