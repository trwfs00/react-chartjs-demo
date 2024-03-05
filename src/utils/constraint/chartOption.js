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
  ENGLISH_OPTION: {
    plugins: {
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
          footer: () => {
            const bidAmount = '1,450,000.00 (THB)';
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
