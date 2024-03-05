import { faker } from "@faker-js/faker"

const labels = [
    // "0",
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

  const dataset = [
    {
      companyname:'1 เฮลท์แคร์ จำกัด',
      bid:1500000,
      color:'rgb(11, 78, 128)'
    },
    {
      companyname:'1 บวก 2 พี่น้องกัน จำกัด',
      bid:1550000,
      color:'rgb(255, 255, 132)'
    },
    {
      companyname:'Praut Company',
      bid:1600000,
      color:"rgb(255, 99, 132)"
      
    },
    {
      companyname:'1 เฮลท์แคร์ จำกัด',
      bid:1650000,
      color:'rgb(11, 78, 128)'

    },
    {
      companyname:'1 เฮลท์แคร์ จำกัด',
      bid:1700000,
      color:'rgb(11, 78, 128)'
    },
    {
      companyname:'1 บวก 2 พี่น้องกัน จำกัด',
      bid:1701000,
      color:'rgb(255, 255, 132)'

    },
    {
      companyname:'1 เฮลท์แคร์ จำกัด',
      bid:1750000,
      color:'rgb(11, 78, 128)'

    },
    {
      companyname:'Praut Company',
      bid:1800000,
      color:"rgb(255, 99, 132)"
    },
    {
      companyname:'1 บวก 2 พี่น้องกัน จำกัด',
      bid:1850000,
      color:'rgb(255, 255, 132)'
    },
    {
      companyname:'1 เฮลท์แคร์ จำกัด',
      bid:1900000,
      color:'rgb(11, 78, 128)'
    },
  ]

  const bid = [...dataset.bid]
  const color = [...dataset.color]


export const data_english = {
    labels,
    datasets: [
      {
        label: '1 บวก 2 พี่น้องกัน จำกัด',
        data: bid,
        backgroundColor: color,
        borderColor: "rgb(0,0,0)",
        pointRadius: 5,
        borderWidth: 1.2,
        drawBorder: false,
        pointBorderColor: color,
      }
    ],
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