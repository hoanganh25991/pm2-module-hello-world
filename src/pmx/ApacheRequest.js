import pmx from "pmx"
import countReq from "../mongodb/countReq"

const _ = console.log
const Probe = pmx.probe()

const options = {
  // Options related to the display style on Keymetrics
  widget: {
    logo: "https://storage.googleapis.com/glass-turbine-148103.appspot.com/apache.png",
    theme: ["#141A1F", "#222222", "#3ff", "#3ff"],
    // Section to show / hide
    el: {
      probes: true,
      actions: true
    },
    // Main block to show / hide
    block: {
      actions: false,
      issues: false,
      meta: false,
      cpu: false,
      mem: false,
      // Custom metrics to put in BIG
      main_probes: ["Request"]
    }
  }
}

let totalReq = null

pmx.initModule(options, (err, conf) => {
  // Regis metrics
  Probe.metric({
    name: "Request",
    value: () => totalReq
  })

  const { interval_unit, interval_value } = conf

  setInterval(() => {
    const countWait = countReq(interval_unit, interval_value)
    countWait.then(count => {
      const value = interval_value === 1 ? "" : interval_value
      totalReq = `${count}/${value}${interval_unit}`
    })
  }, 1000)
})
