import { boot } from 'quasar/wrappers'
import { vNaira, vNairaCom } from 'src/directive/naira'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.directive('naira', vNaira)

  app.directive('naira-summerize', vNairaCom)
})
