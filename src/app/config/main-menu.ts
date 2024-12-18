import { ValidRoles } from "../interfaces/valid-roles.interface";

export const mainMenu = [
  {
    permission: [ValidRoles.user],
    label: 'Dashboard',
    route: '/home',
  },
  {
    permission: [ValidRoles.admin],
    label: 'Configuration',
    icon: 'pi pi-fw pi-cog',
    items: [
      {
        permission : [ValidRoles.admin],
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            permission : [ValidRoles.admin],
            label: 'Add',
            route: '/home/users',
          },
          {
            permission : [ValidRoles.admin],
            label: 'Edit',
          },
          {
            permission : [ValidRoles.admin],
            label: 'Delete',
          },
        ],
      }
    ],
  },
];
