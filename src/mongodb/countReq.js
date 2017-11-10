import mongoose from "mongoose"
import connect, { loadDefaultModels } from "./connect"
import "./models/customView"

const _ = console.log
connect("xhprof")
loadDefaultModels()

export const countReq = () => {
  const CustomView = mongoose.model("CustomView")
  const lastMinute = Math.floor(new Date().getTime() / 1000) - 60
  const wait = CustomView.count({ timestamp: { $gt: lastMinute } }).exec()

  return wait.catch(err => _(err)).finally(() => mongoose.disconnect())
}

export default countReq
