import React, { Suspense } from 'react'
import { Root } from './dependencies'

const App = React.memo(props => (
  <Suspense maxDuration={1000} fallback={null}>
    <Root {...props} />
  </Suspense>
))

export default App
