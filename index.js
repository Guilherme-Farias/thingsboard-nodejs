
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

const telemetry = [
    { name: 'RECIFE', heatIndex: 2.33, warning: 'Normal' },
    { name: 'PETROLINA', heatIndex: 1.11, warning: 'Normal' },
    { name: 'ARCO VERDE', heatIndex: 1, warning: 'Normal' },
    { name: 'GARANHUNS', heatIndex: 1.33, warning: 'Normal' },
    { name: 'SURUBIM', heatIndex: 1.11, warning: 'Normal' },
    { name: 'CABROBO', heatIndex: 1.67, warning: 'Normal' },
    { name: 'CARUARU', heatIndex: 1, warning: 'Normal' },
    { name: 'IBIMIRIM', heatIndex: 1.11, warning: 'Normal' },
    { name: 'SERRA TALHADA', heatIndex: 1.11, warning: 'Normal' },
    { name: 'FLORESTA', heatIndex: 1.67, warning: 'Normal' },
    { name: 'PALMARES', heatIndex: 1.56, warning: 'Normal' },
    { name: 'OURICURI', heatIndex: 1, warning: 'Normal' },
    { name: 'SALGUEIRO', heatIndex: 1, warning: 'Normal' }
]

// Para rodar: 
// >> node index.js
telemetry.map(station => {
    axios.post(`http://demo.thingsboard.io/api/v1/${stations.get(station.name)}/telemetry`,
        {
            heat_index: station.heatIndex,
            warning_msg: station.warning
        }).then(response => { console.log(response) })
        .catch(error => { console.log(error) })
})