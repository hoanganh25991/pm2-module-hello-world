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
      probes: false,
      actions: false
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

const getUnitName = (unit, value) => {
  const showValueAs = +value === 1 ? "" : value
  return `/${showValueAs}${unit}`
}

pmx.initModule(options, (err, conf) => {
  const { interval_unit: unit, interval_value: value } = conf
  // Regis meter

  const metric = Probe.meter({
    name: "Request",
    unit: getUnitName(unit, value),
    timeframe: 1
  })

  setInterval(() => {
    const countWait = countReq(unit, value)
    countWait.then(count => metric.mark(count))
  }, 1000)
})
