import { externalTooltipHandler } from "../customTooltip"

let delayed
const BORDER = true
const options = reservedPrice => {
  return {
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
        grid: {
          color: context => {
            if (context.tick.value === reservedPrice) {
              return "red"
            }

            return "#00000040"
          },
        },
        ticks: {
          callback: (val, index) => {
            return val === reservedPrice
              ? `${val.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}\n(Reserve Price)`.split("\n")
              : val.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })
          },
          color: context => {
            // UI Change
            // if(context.tick.value === reservedPrice) {
            //  return 'red'
            // }
            return "#0B4E80"
          },
          font: {
            size: 14,
            weight: "400",
          },
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
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
        callbacks: {
          label: context => {
            let label = context.dataset.label || ""
            const bidAmount = `${context.parsed.y.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })} (THB)`
            const date = formatDateToCustomString(
              context.dataset.date[context.dataIndex]
            )
            const body = { label: label, bidAmount: bidAmount, date: date }
            return body
          },
        },
      },
    },
  }
}

const formatDateToCustomString = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract date components
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Extract time components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${amOrPm}`;

  // Combine date and time
  const formattedDateTime = `${month} ${day}, ${year} ${formattedTime}`;
  return formattedDateTime;
};

export default options
