// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import Navbar from "./collections/navbar";
import Footer1 from "./collections/footer";
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import Quizzes from './collections/Quizzes';
import QuizResults from './collections/QuizResults';
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({



  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Posts, Media, Categories, Users, Navbar,Footer1,Quizzes, QuizResults],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})



// import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import sharp from 'sharp'
// import path from 'path'
// import { buildConfig, PayloadRequest } from 'payload'
// import { fileURLToPath } from 'url'

// import { Categories } from './collections/Categories'
// import { Media } from './collections/Media'
// import { Pages } from './collections/Pages'
// import { Posts } from './collections/Posts'
// import { Users } from './collections/Users'
// import Navbar from "./collections/navbar";
// import Footer1 from "./collections/footer";
// import { Footer } from './Footer/config'
// import { Header } from './Header/config'
// import { plugins } from './plugins'
// import { defaultLexical } from '@/fields/defaultLexical'
// import { getServerSideURL } from './utilities/getURL'
// import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
// import { s3Storage } from '@payloadcms/storage-s3'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

// export default buildConfig({
//   admin: {
//     components: {
//       beforeLogin: ['@/components/BeforeLogin'],
//       beforeDashboard: ['@/components/BeforeDashboard'],
//     },
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
//     user: Users.slug,
//     livePreview: {
//       breakpoints: [
//         { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
//         { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
//         { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
//       ],
//     },
//   },
//   editor: defaultLexical,
//   db: mongooseAdapter({
//     url: process.env.DATABASE_URI || '',
//   }),
//   collections: [Pages, Posts, Media, Categories, Users, Navbar, Footer1],
//   cors: [getServerSideURL()].filter(Boolean),
//   globals: [Header, Footer],
//   plugins: [
//     cloudStoragePlugin({
//       collections: {
//         media: true,
//         'media-with-prefix': {
//           prefix: 'uploads/',
//         },
//       },
//       adapter: s3Storage({
//         bucket: process.env.S3_BUCKET,
//         config: {
//           credentials: {
//             accessKeyId: process.env.S3_ACCESS_KEY_ID,
//             secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//           },
//           region: process.env.S3_REGION,
//         },
//       }),
//     }),
//   ],
  
//   secret: process.env.PAYLOAD_SECRET,
//   sharp,
//   typescript: {
//     outputFile: path.resolve(dirname, 'payload-types.ts'),
//   },
//   jobs: {
//     access: {
//       run: ({ req }: { req: PayloadRequest }): boolean => {
//         if (req.user) return true
//         const authHeader = req.headers.get('authorization')
//         return authHeader === `Bearer ${process.env.CRON_SECRET}`
//       },
//     },
//     tasks: [],
//   },
// })
