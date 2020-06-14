// declare module '*.vue' {
//   import { ComponentOptions } from 'vue'
//   // eslint-disable-next-line no-var
//   var component: ComponentOptions
//   export default component

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
