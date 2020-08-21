/* eslint-disable @typescript-eslint/no-unused-vars */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '../../core/roles/roles.entity';
import { Roles } from '../../common/enums/roles.enum';


export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const admin = {
      name: Roles.ADMIN,
    };
    const creator = {
      name: Roles.CREATOR,
    };
    const member = {
      name: Roles.MEMBER,
    };
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([admin, creator, member])
      .execute();
  }
}
