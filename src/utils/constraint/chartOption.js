let delayed
const chartOption = {
  zoomOption: {
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true
      },
      delay: context => {
        let delay = 0
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100
        }
        return delay
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "AUCTION - ENGLISH",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
          threshold: 5,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
  },
}

export default chartOption
