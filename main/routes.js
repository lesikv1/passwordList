
export default (components = {}) =>
  [
    {
      path: '/',
      exact: true,
      component: components.Main,
      contentSize: 'wide'
      // contentSize: 'wide' = '100%' | 'desktop' = 1024 | 'tablet' = 768 | 'mobile' = 480
    },
    {
      path: '/profile',
      exact: true,
      component: components.Profile,
      contentSize: 'wide'
    }
    // The app routes go here:
  ].concat([
    // TODO: Those routes are for test only. Remove them from your app.
  ])
