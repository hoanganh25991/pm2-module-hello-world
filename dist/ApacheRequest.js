"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.initMetric = undefined

var _pmx = require("pmx")

var _pmx2 = _interopRequireDefault(_pmx)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const initMetric = (exports.initMetric = () => {
  const Probe = _pmx2.default.probe()

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
        main_probes: ["test-probe"]
      }
    }
  }

  const callback = (err, conf) => {
    let totalReq = null
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

    setInterval(function() {
      // Count
      totalReq++
    }, 1000)
  }

  _pmx2.default.initModule(options, callback)
})

exports.default = initMetric
