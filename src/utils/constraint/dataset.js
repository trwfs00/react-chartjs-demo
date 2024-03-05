import { faker } from "@faker-js/faker"
import { colors } from "./colors"

const randomColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgba(${r}, ${g}, ${b}, 1.0)`
}

const randomFixedColor = () => {
  const random = Math.floor(Math.random() * 99)
  return colors[random]
}

const labels = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ]

  const company = []
  const bid = []

  const dataset = [
    {
      companyname:'1 เฮลท์แคร์ จำกัด',
      bid:1500000
    },
    {
      companyname:'1 บวก 2 พี่น้องกัน จำกัด',
      bid:1550000
    },
    {
      companyname:'Praut Company',
      bid:1600000
    },
    {
      companyname:'1 เฮลท์แคร์ จำกัด',
      bid:1650000
    },
    {
      companyname:'1 เฮลท์แคร์ จำกัด',
      bid:1700000
    },
    {
      companyname:'1 บวก 2 พี่น้องกัน จำกัด',
      bid:1701000
    },
    {
      companyname:'1 เฮลท์แคร์ จำกัด',
      bid:1750000
    },
    {
      companyname:'Praut Company',
      bid:1800000
    },
    {
      companyname:'1 บวก 2 พี่น้องกัน จำกัด',
      bid:1850000
    },
    {
      companyname:'1 เฮลท์แคร์ จำกัด',
      bid:1900000
    },
  ]



  dataset.forEach(item => {
    // company.push(item.companyname);
    bid.push(item.bid);
  });

  console.log(company)
  console.log(bid)

export const data_english = {
    labels,
    datasets: [
      {
        label: '1 บวก 2 พี่น้องกัน จำกัด',
        data: bid,
        // borderColor: ["rgb(11, 78, 128)","rgb(255, 255, 132)"],
        backgroundColor: ["rgb(11, 78, 128)","rgb(255, 255, 132)"],
        borderColor: "rgb(0,0,0)",
        pointRadius: 5,
        borderWidth: 1.2,
        drawBorder: false,
        pointBorderColor: ["rgb(11, 78, 128)","rgb(255, 255, 132)"],
      }
    ],
  }
  
  export const data_sealed = {
    labels,
    datasets: [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
]

export const reverse_auto_generate = {
  labels: labels.slice(0, 20),
  datasets: [
    ...Array.from({ length: 6 }, (_, i) => {
      let value = colors[i]
      let startingValue = 15000000 - i * 500000 // Adjust the starting value for each company
      return {
        label: `Company  ${String.fromCharCode(65 + i)}`,
        data: [
          null,
          ...Array.from(
            { length: 10 },
            (_, j) => startingValue - j * 50000 // Adjust the decrement value for each company
          ),
        ],
        fill: true,
        pointRadius: 5,
        borderWidth: 1.2,
        drawBorder: false,
        borderColor: "#000000",
        pointBorderColor: value.hex,
        pointBackgroundColor: value.hex,
        backgroundColor: value.hex,
      }
    }),
  ],
}

export const data_sealed_reverse = label => {
  let viewPort
  if (Number.isInteger(label) && label > 0) {
    viewPort = Array.from({ length: label + 1 }, (_, index) => index.toString())
  }
  return {
    labels: viewPort,
    datasets: [
      {
        label: "1 เฮลท์แคร์ จำกัด",
        data: [null, 1500000, 1400000, 1300000, 1100000, 900000],
        fill: false,
        pointRadius: 5,
        borderWidth: 1.8,
        drawBorder: false,
        borderColor: "#0B4E80",
        pointBorderColor: "#0B4E80",
        pointBackgroundColor: "#0B4E80",
        backgroundColor: "#0B4E80",
      },
      {
        label: "1 บวก 2 พี่น้องกัน จำกัด",
        data: [null, 1450000, 1200000, 950000],
        fill: false,
        pointRadius: 5,
        borderWidth: 1.8,
        drawBorder: false,
        borderColor: "#16A651",
        pointBorderColor: "#16A651",
        pointBackgroundColor: "#16A651",
        backgroundColor: "#16A651",
      },

      {
        label: "Praut Company",
        data: [null, 1500000, 1000000],
        fill: false,
        pointRadius: 5,
        borderWidth: 1.8,
        drawBorder: false,
        borderColor: "#FED500",
        pointBorderColor: "#FED500",
        pointBackgroundColor: "#FED500",
        backgroundColor: "#FED500",
      },
    ],
  }
}

export const data_sealed = {
  labels,
  datasets: [
    {
      label: "1 บวก 2 พี่น้องกัน จำกัด",
      data: labels.map(() =>
        faker.datatype.number({ min: 1000000, max: 15000000 })
      ),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "1 เฮลท์แคร์ จำกัด",
      data: labels.map(() =>
        faker.datatype.number({ min: 1000000, max: 15000000 })
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
}
