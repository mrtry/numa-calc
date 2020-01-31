import * as React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import Calc from './src/ui/page/Calc'

export default () => (
  <PaperProvider>
    <Calc />
  </PaperProvider>
)
