import { Roles } from '../../src/user/types/roles.type';

export const users = [
  {
    email: 'test@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: Roles.Admin,
        },
      ],
    },
  },
  {
    email: 'user@test.fr',
    password: 'Test123/',
  },
];
