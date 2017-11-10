import pmx from "pmx"

export const initMetric = () => {
  const Probe = pmx.probe()

  const options = {
    // Options related to the display style on Keymetrics
    widget: {
      // Logo displayed
      logo: "http://tinker.press/images/donuts-350x150.jpg",
      // Module colors
      // 0 = main element
      // 1 = secondary
      // 2 = main border
      // 3 = secondary border
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
        main_probes: ["Apache Request", "Histogram"]
      }
    }
  }

  const callback = (err, conf) => {
    let totalReq = null
    let latency = null
    // Regis metrics
    Probe.metric({
      name: "Apache Request",
      value: function() {
        return totalReq
      },
      alert: {
        mode: "threshold",
        value: 500,
        msg: "Congratulation. So many requests hit to our server!",
        action: function(val) {
          console.log(`${val} requests hit to server`)
        }
      }
    })

    // Regis histogram
    const histogram = Probe.histogram({
      name: "Histogram",
      measurement: "mean"
    })

    setInterval(function() {
      totalReq++
      if (totalReq > 1000) totalReq = 0
      latency = Math.round(Math.random() * 100)
      histogram.update(latency)
    }, 1000)
  }

  pmx.initModule(options, callback)
}

export default initMetric
