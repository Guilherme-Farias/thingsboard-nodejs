
const axios = require("axios")
const stations = require("./src/models/DevicesToken")
const Base64ToJSONHandler = require("./src/utils/Base64ToJSONHandler")

exports.handler = async (event) => {
  const telemetry = []
  await event.Records.forEach(result => {
    const response = Base64ToJSONHandler(result.kinesis.data)

    const name = response.name
    var heatIndex = response.heat_index
    var warning;

    if (!!heatIndex) {
      const celsius = Math.round((((heatIndex - 32) / 1.8) + Number.EPSILON) * 100) / 100
      if (celsius <= 27.0) {
        warning = "Normal"
      } else if (celsius > 27.0 && celsius <= 32.0) {
        warning = "Caution"
      } else if (celsius > 32.0 && celsius <= 41.0) {
        warning = "Extreme caution"
      } else if (celsius > 41.0 && celsius <= 54.0) {
        warning = "Danger"
      } else {
        warning = "Extreme danger"
      }
      heatIndex = celsius

    } else {
      heatIndex = 0
      warning = "Insufficient data"
    }

    telemetry.push({ name, heatIndex, warning })

  })

  const telemetryFormatted = telemetry.map(station => station.name.includes("CABROB") ? { ...station, name: "CABROBO" } : station)


  for (var station of telemetryFormatted) {
    try {
      const res = await axios.post(`https://demo.thingsboard.io/api/v1/${stations.get(station.name)}/telemetry`,
        {
          heat_index: station.heatIndex,
          warning_msg: station.warning
        })
      console.log("OK", res.status)
    } catch (e) {
      console.log({ error: e })
    }
  }
}