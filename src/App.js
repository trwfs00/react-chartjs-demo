import "./App.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import zoomPlugin from "chartjs-plugin-zoom"
import { Box, Container, Stack } from "@mui/material"
import "chartjs-plugin-zoom"
import { data_english, data_sealed_reverse } from "./utils/constraint/dataset"
import { colors } from './utils/constraint/colors'
import AuctionChart from "./components/SealedReverse/AuctionChart"
import ChartTest from "./components/test"
import CustomLegendChart from "./components/test"

const english_revert = require('./utils/english_revert.json')

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  zoomPlugin,
  Title,
  Tooltip,
  Legend
)

const labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

// const chartData = {
//   labels: labels,
//   datasets: [
//     {
//       label: "โง่",
//       data: [null, 1500000, null],
//       borderColor: "#000", // Customize line color
//       fill: false, // Do not fill area under the line
//       pointBackgroundColor: "#043daf",
//       pointBorderColor: "#fff",
//       pointRadius: 7,
//     },
//     {
//       label: "ฉลาด",
//       data: [null, null, 1510000],
//       borderColor: "#000", // Customize line color
//       fill: false, // Do not fill area under the line
//       pointBackgroundColor: "#52ad21",
//       pointBorderColor: "#fff",
//       pointRadius: 7,
//     },
//     {
//       label: "ไม่ฉลาด",
//       data: [null, null, null, 1505000],
//       borderColor: "#000", // Customize line color
//       fill: false, // Do not fill area under the line
//       pointBackgroundColor: "#9123ad",
//       pointBorderColor: "#fff",
//       pointRadius: 7,
//     },
//     {
//       data: [null, 1500000, 1510000, 1505000],
//       borderColor: "#000", // Customize line color
//       fill: false, // Do not fill area under the line
//       pointStyle: false,
//       pointRadius: 0,
//       pointHoverRadius: 0,
//       pointHitRadius: 0
//     }
//   ],
// }

const legendOptions = {
  plugins: {
    legend: {
      display: true,
      position: "bottom", // Customize legend position
      labels: {
        usePointStyle: true, // Show points as legend icons
      },
    },
  },
}


const computeDataEnglish = (data) => {

  let companies = {};

  data.result.forEach(result => {
    const companyName = result.detail.company_name;
    const biddingAmount = result.detail.bidding_amount;

    if (!companies[companyName]) {
      companies[companyName] = Array(data.result.length).fill(null); // Create array with null values
    }

    const index  = data.result.length - data.result.indexOf(result) - 1; // Calculate the index from the end
    companies[companyName][index] = biddingAmount; // Insert the bidding amount at the calculated index
  });

  const transformedData = Object.entries(companies).map(([companyName, allBid],index) => {
    allBid.unshift(null); // Add null at the beginning of the array
    return {
      label: companyName,
      data: allBid,
      borderColor: "#000",
      fill: false,
      pointBorderColor: "#fff",
      pointRadius: 7,
      pointBackgroundColor: colors[index].hex,
    }
  });

  // จัด data ให้เส้น
  const sortedBiddingAmounts = data.result.map(item => item.detail.bidding_amount).sort((a, b) => b - a);
  sortedBiddingAmounts.unshift(null);
  
  const chartEngData = {
    labels: labels,
    datasets: [
      ...transformedData,
      {
        data: sortedBiddingAmounts,
        borderColor: "#000",
        fill: false,
        pointStyle: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        pointHitRadius: 0
      },
    ]
  }
  return chartEngData
}


function App() {
  return (
    <Container maxWidth='xl' className='App'>
      <Stack direction='column' alignItems='center' spacing={4}>
        <AuctionChart
          title='English - Forward'
          bidHistory={data_english(10)}
          auctionType={1}
        />
        <AuctionChart
          title='Sealed - Reverse'
          bidHistory={data_sealed_reverse(10)}
          auctionType={2}
          reservedPrice={1000000}
        />
      </Stack>
    </Container>
  )
}

export default App
