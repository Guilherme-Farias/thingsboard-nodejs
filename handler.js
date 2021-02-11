
const axios = require("axios")

const stations = new Map()
stations.set("RECIFE", "uEm3TfEzRxKznfw1e3Kd")
stations.set("PETROLINA", "bUSWfvCQ7RHQjlID8SaN")
stations.set("ARCO VERDE", "RCW0mkxMXBLMP6AFVlkg")
stations.set("GARANHUNS", "GF9Yqb7p41WCaY2ZKPz0")
stations.set("SURUBIM", "2gLui7dKOIXzBuHgGFtA")
stations.set("CABROBO", "J3dRt9F9fVE8ItNwoSan")
stations.set("CARUARU", "zqv7pEE1JiUe32XmMF5H")
stations.set("IBIMIRIM", "YwHq2K1O9TpgOKREIHF3")
stations.set("SERRA TALHADA", "PyXH8Mq7xxaK3n30BEya")
stations.set("FLORESTA", "G9ky03VT8DoHOVo0fcOM")
stations.set("PALMARES", "aUXIKJoooCQnS8LIFBHI")
stations.set("OURICURI", "7xwbgQ8NU8Y8hbxiTkFG")
stations.set("SALGUEIRO", "XwlrkQesiltZbG1qHIkH")


module.exports.handler = async event => {

  const telemetry = []


  await event.Records.map(result => {

    const response = JSON.parse((Buffer.from(result.kinesis.data, "base64").toString("ascii")).replace(/[\u0000-\u0019]+/g, ""))

    const name = response.name
    var heatIndex = response.heat_index
    var warning;


    if (heatIndex != 0) {
      const celsius = Math.round((((heatIndex - 32) / 1.8) + Number.EPSILON) * 100) / 100
      if (celsius <= 27.0) {
        warning = "Normal"
      } else if (celsius >= 27.0 & celsius <= 32.0) {
        warning = "Caution"
      } else if (celsius >= 32.1 & celsius <= 41.0) {
        warning = "Extreme caution"
      } else if (celsius >= 41.1 & celsius <= 54.0) {
        warning = "Danger"
      } else {
        warning = "Extreme danger"
      }
      heatIndex = celsius

    } else {
      warning = "Normal"
    }

    telemetry.push({ name, heatIndex, warning })

  })

  const telemetryFormatted = telemetry.map(station => station.name == "CABROBC" ? { ...station, name: "CABROBO" } : station)

  console.log(telemetryFormatted)

  telemetryFormatted.map(station => {
    axios.post(`https://demo.thingsboard.io/api/v1/${stations.get(station.name)}/telemetry`,
      {
        heat_index: station.heatIndex,
        warning_msg: station.warning
      }).then(response => { console.log(response) })
      .catch(error => { console.log(error) })
  })
}