import mongoose from "mongoose"
import { connect, loadDefaultModels } from "./connect"
import "./models/customView"
const _ = console.log

connect("xhprof")
loadDefaultModels()

const getLastXSecs = (unit, value) => {
  let minusVal = null
  value = +value
  switch (unit) {
    case "m": {
      minusVal = value * 60
      break
    }
    case "s": {
      minusVal = value
      break
    }
    case "ms": {
      minusVal = value / 1000
      break
    }
    default: {
      minusVal = 0
      break
    }
  }
  return Math.floor(new Date().getTime() / 1000) - minusVal
}

const countReq = (unit, value) => {
  const CustomView = mongoose.model("CustomView")
  const lastXSecs = getLastXSecs(unit, value)
  const wait = CustomView.count({ timestamp: { $gt: lastXSecs } }).exec()
  return wait.catch(err => err)
}

export default countReq
