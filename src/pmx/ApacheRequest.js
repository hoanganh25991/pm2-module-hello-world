import pmx from "pmx"
import countReq from "../mongodb/countReq"
const Probe = pmx.probe()

const options = {
  // Options related to the display style on Keymetrics
  widget: {
    logo: "http://tinker.press/images/donuts-350x150.jpg",
    theme: ["#141A1F", "#222222", "#3ff", "#3ff"],
    // Section to show / hide
    el: {
      probes: true,
      actions: true
    },
    // Main block to show / hide
    block: {
      actions: false,
      issues: true,
      meta: true,
      // Custom metrics to put in BIG
      main_probes: ["Apache Request"]
    }
  }
}

let totalReq = null

pmx.initModule(options, () => {
  // Regis metrics
  Probe.metric({
    name: "Apache Request",
    value: () => totalReq
  })
})

setInterval(() => {
  const countWait = countReq()
  countWait.then(count => (totalReq = count))
}, 1000)
