const getConfig = require('startupjs/bundler').webpackWebConfig

let FORCE_COMPILE_MODULES = [
  'react-native-animatable',
  'react-router-native-stack',
  'react-native-progress',
  'react-native-paper',
  'react-native-fontawesome',
  'react-native-vector-icons'
]



module.exports = getConfig(undefined, {
  forceCompileModules: FORCE_COMPILE_MODULES,
  alias: {
    'react-native-svg': 'react-native-svg-web'
  },
  module: {
    rules: [
      Object.assign({},{
        include: new RegExp(`node_modules/(?:${FORCE_COMPILE_MODULES.join('|')})`)
      })
    ]
  }
})
