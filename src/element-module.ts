import { PluginObject } from 'vue'
import {
  Loading,
  MessageBox,
  Message,
  Notification,
  // component
  Button,
  Dialog,
  Icon,
  Row,
  Col,
  Container,
  Aside,
  Header,
  Menu,
  Submenu,
  MenuItem,
  Main,
  Input,
  Tag,
} from 'element-ui'

export const element: PluginObject<any> = {
  install(app) {
    const compList = [
      Button,
      Dialog,
      Icon,
      Row,
      Col,
      Container,
      Aside,
      Header,
      Menu,
      Submenu,
      MenuItem,
      Main,
      Input,
      Tag,
    ]
    compList.forEach(comp => {
      app.component(comp.name, comp)
    })

    app.use(Loading.directive)
    const proto = app.prototype
    // const proto = app.config.globalProperties
    proto.$loading = Loading.service
    proto.$msgbox = MessageBox
    proto.$alert = MessageBox.alert
    proto.$confirm = MessageBox.confirm
    proto.$prompt = MessageBox.prompt
    proto.$notify = Notification
    proto.$message = Message
  },
}
