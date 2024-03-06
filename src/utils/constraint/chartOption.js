let delayed
const BORDER = true
const chartOption = {
  SEALED_OPTION: {
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
        display: false,
        align: "start",
        position: "bottom",
        fullSize: false,
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
          pointStyleWidth: 16,
          borderRadius: 8,
          useBorderRadius: true,
          padding: 12,
          color: "#0B4E80",
          font: {
            size: 12,
            weight: "500",
          }
        },
      },
      title: {
        display: false,
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
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(11, 78, 128, 0.9)',
        titleColor: '#fff',
        titleFont: { weight: 'bold' },
        titleAlign: 'left',
        titleSpacing: 2,
        bodyColor: '#fff',
        bodyFont: { weight: 'bold' }, // Customize font properties
        bodyAlign: 'left',
        bodySpacing: 2,
        footerColor: '#fff',
        footerFont: { weight: 'bold' },
        footerAlign: 'left',
        footerSpacing: 2,
        padding: 6,
        position: 'average', // Adjust as needed
        usePointStyle: true,
        callbacks: {
          title: (context) => {
            return `Bid No. ${context[0].label}`
          },
          label: (context) => {
            let label = context.dataset.label || '';
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            return `${label} - ${time}`;
          },
          labelPointStyle: () => {
            return {
              pointStyle: 'circle',
              rotation: 0
            }
          },
          footer: (context) => {
            const bidAmount = `${context[0].formattedValue} (THB)`
            const date = formatDateToCustomString(new Date());
            return `${bidAmount}\n${date}`;
          },
        },
      }
    },
  },
  ENGLISH_OPTION: {
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
        display: false,
        align: "start",
        position: "bottom",
        fullSize: false,
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
          pointStyleWidth: 16,
          borderRadius: 8,
          useBorderRadius: true,
          padding: 12,
          color: "#0B4E80",
          font: {
            size: 12,
            weight: "500",
          }
        },
      },
      title: {
        display: false,
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
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(11, 78, 128, 0.9)',
        titleColor: '#fff',
        titleFont: { weight: 'bold' },
        titleAlign: 'left',
        titleSpacing: 2,
        bodyColor: '#fff',
        bodyFont: {}, // Customize font properties
        bodyAlign: 'left',
        bodySpacing: 2,
        footerColor: '#fff',
        footerFont: { weight: 'bold' },
        footerAlign: 'left',
        footerSpacing: 2,
        padding: 6,
        position: 'average', // Adjust as needed
        usePointStyle: true,
        callbacks: {
          title: (context) => {
            return `Bid No. ${context[0].label}`
          },
          label: (context) => {
            let label = context.dataset.label || '';
            return label;
          },
          labelPointStyle: () => {
            return {
              pointStyle: 'circle',
              rotation: 0
            }
          },
          footer: (context) => {
            const bidAmount = `${context[0].formattedValue} (THB)`
            const date = formatDateToCustomString(new Date());
            return `${bidAmount}\n${date}`;
          },
        },
      }
    }
  }
}

const formatDateToCustomString = (date) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Extract date components
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Extract time components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;

  // Combine date and time
  const formattedDateTime = `${month} ${day}, ${year} ${formattedTime}`;
  return formattedDateTime;
}

export default chartOption
