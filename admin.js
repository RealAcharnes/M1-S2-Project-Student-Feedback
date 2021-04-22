const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const styled = require('styled-components')

const User = require('./models/User')
const Quizzes = require('./models/Quiz')
const History = require('./models/history')

// AdminBro.bundle('./client/src/components/admin/ADMINPANEL', 'SidebarResourceSection')
// AdminBro.bundle('./adminbro-sidebar', 'SidebarResourceSection')

// AdminBro.bundle('./user', 'SidebarFooter')
// // component: AdminBro.bundle('./client/src/components/ADMINPANEL.component.jsx')
// // AdminBro.bundle('./user', 'SidebarBranding')
// AdminBro.bundle('./user', 'LoggedIn')

// const darkTheme = {
//     VariantValues: [
//       'primary',
//       'danger',
//       'success',
//       'info',
//       'secondary',
//       'default',
//       'light',
//     ],
//     colors: {
//       primary100: '#034b52'
//       ,
//       primary80: '#70C9B0',
//       primary60: '#70C9B0',
//       primary40: '#70C9B0',
//       primary20: '#70C9B0',
//        filterBg: '#217e84',
//        hoverBg: '#32A887',

//        bg: '#217e84',
  
//       defaultText: '#FFFFFF',
//       lightText: '#A9AABC',
//       border: '#2E324A',
//       borderOnDark: '#2E324A',
//       innerBck: '#192035',
//       darkBck: '#20273E',
//       lightBck: '#485899',
//       superLightBack: '#303B62',
//       inputBck: '#192035',
//       lightSuccess: '#008340',
//       lightError: '#660040',
//     },
//     lineHeights: {
//       xs: '10px',
//       sm: '12px',
//       default: '16px',
//       md: '16px',
//       lg: '24px',
//       xl: '32px',
//       xxl: '40px',
//     },
//     fontSizes: {
//       xs: '10px',
//       sm: '12px',
//       default: '14px',
//       md: '14px',
//       lg: '16px',
//       xl: '18px',
//       h4: '24px',
//       h3: '28px',
//       h2: '32px',
//       h1: '40px',
//     },
//     sizes: {
//       navbarHeight: '64px',
//       sidebarWidth: '300px',
//       maxFormWidth: '740px',
//     },
//     space: {
//       xs: '2px',
//       sm: '4px',
//       default: '8px',
//       md: '8px',
//       lg: '16px',
//       xl: '24px',
//       xxl: '32px',
//       x3: '48px',
//       x4: '64px',
//       x5: '80px',
//       x6: '128px',
//     },
//     font: "'Roboto', 'Poppins', sans-serif",
//   };

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  rootPath: '/admin',
  dashboard: {
    // component: AdminBro.bundle('./client/src/components/admin/react.component.jsx'),
    component: AdminBro.bundle('./adminbro-dashboard'),
    handler: async () => {
        return { some: allresources}
    }
  },
  resources: [
    {
      resource: User,
      options: {
        actions: {
            list: {
                isVisible: true,
                showInDrawer:false,
            },
            new: {
                isVisible: true,
                showInDrawer:false
            },
          },
       } 
    },
    {
      resource: Quizzes,
    },
    {
      resource: History,
    }
  ],
  branding: {
    logo: 'URL_TO_YOUR_LOGO',
    companyName: 'NEUROEDUCATION-FEEDBACK',
    softwareBrothers: false,   // if Software Brothers logos should be shown in the sidebar footer
    // theme :darkTheme
},
})

const admin = new AdminBro(adminBro);

// const allresources = admin.allResources()

module.exports = adminRouter = AdminBroExpress.buildRouter(adminBro)