let delayed
const BORDER = true
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
    scales: {
      x: {
        title: {
          display: true,
          text: "BIDDING NO.",
          color: "#0B4E80",
          font: {
            size: 14,
            weight: "600",
          },
        },
        ticks: {
          font: {
            size: 14,
            weight: "400",
          },
          color: "#0B4E80",
        },
        border: {
          display: BORDER,
          color: "#000000",
          width: 2,
        },
      },
      y: {
        title: {
          display: true,
          text: "TOTAL BIDDING (THB)",
          color: "#0B4E80",
          font: {
            size: 14,
            weight: "600",
          },
        },
        ticks: {
          //   callback: function (val, index) {
          //     // Hide every 2nd tick label
          //     return index % 2 === 0 ? this.getLabelForValue(val) : ""
          //   },
          font: {
            size: 14,
            weight: "400",
          },
          color: "#0B4E80",
        },
        border: {
          display: BORDER,
          color: "#000000",
          width: 2,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        align: "start",
        position: "bottom",
        fullSize: false,
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
          pointStyleWidth: 16,
          borderRadius: 8,
          useBorderRadius: true,
        },
      },
      title: {
        display: true,
        text: "AUCTION - SEALED",
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
