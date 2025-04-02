import type { CollectionConfig } from 'payload';
import { authenticated } from '../../access/authenticated';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, 
  timestamps: true,

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'user',
      required: true,
    },
  ],

  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },

  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
};



// import type { CollectionConfig } from 'payload'

// import { authenticated } from '../../access/authenticated'

// export const Users: CollectionConfig = {
//   slug: 'users',
//   access: {
//     admin: authenticated,
//     create: authenticated,
//     delete: authenticated,
//     read: authenticated,
//     update: authenticated,
//   },
//   admin: {
//     defaultColumns: ['name', 'email'],
//     useAsTitle: 'name',
//   },
//   auth: true,
//   fields: [
//     {
//       name: 'name',
//       type: 'text',
//     },
//   ],
//   timestamps: true,
// }
