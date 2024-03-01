import { faker } from "@faker-js/faker"

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

export const data_english = {
    labels,
    datasets: [
      {
        label: "1 เฮลท์แคร์ จำกัด",
        data: labels.map(() =>
          faker.datatype.number({ min: 1000000, max: 15000000 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "1 บวก 2 พี่น้องกัน จำกัด",
        data: labels.map(() =>
          faker.datatype.number({ min: 1000000, max: 15000000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
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