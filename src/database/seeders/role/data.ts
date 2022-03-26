import { RoleName } from "src/api/modules/role/enums";
import { IRole } from "src/api/modules/role/interfaces/role.interface";

export const roleSeeder: IRole[] = [
  { name: RoleName.SUDO, description: "Sudo description.." },
  { name: RoleName.ADMIN, description: "Admin description.." },
  { name: RoleName.MANAGER, description: "Manager description.." },
  { name: RoleName.USER, description: "User description.." }
];
