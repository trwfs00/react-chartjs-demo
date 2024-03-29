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
import zoomPlugin from "chartjs-plugin-zoom"
import { Container, Stack } from "@mui/material"
import "chartjs-plugin-zoom"
import { data_english, data_sealed_reverse } from "./utils/constraint/dataset"
import { colors } from './utils/constraint/colors'
import AuctionChart from "./components/SealedReverse/AuctionChart"


const english_reverse = require('./utils/english_reverse.json')
const english_forward = require('./utils/english_forward.json')
const sealed_reverse = require('./utils/sealed_reverse.json')
const sealed_forward = require('./utils/sealed_forward.json')

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

const computeDataEnglishReverse = (data) => {

  let companies = {};

  data.result.forEach(result => {
    const companyName = result.detail.company_name;
    const biddingAmount = result.detail.bidding_amount;
    const biddingTime = result.detail.bidding_time // Format bidding time to MM-DD-YYYY

    if (!companies[companyName]) {
      companies[companyName] = {
        biddingAmounts: Array(data.result.length).fill(null), // Create array with null values
        biddingTimes: Array(data.result.length).fill(null)
      }
    }

    const index = data.result.length - data.result.indexOf(result) - 1; // Calculate the index from the end
    // companies[companyName][index] = biddingAmount; // Insert the bidding amount at the calculated index
    companies[companyName].biddingAmounts[index] = biddingAmount; // Insert the bidding amount at the calculated index
    companies[companyName].biddingTimes[index] = biddingTime; // Insert the bidding time at the calculated index
  });

  const transformedData = Object.entries(companies).map(([companyName, { biddingAmounts, biddingTimes }], index) => {
    biddingAmounts.unshift(null); // Add null at the beginning of the array
    biddingTimes.unshift(null); // Add null at the beginning of the array
    return {
      label: companyName,
      data: biddingAmounts,
      date: biddingTimes,
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
  console.log("english:", chartEngData)
  return chartEngData
}

const computeDataEnglishForward = (data) => {

  let companies = {};

  data.result.forEach(result => {
    const companyName = result.detail.company_name;
    const biddingAmount = result.detail.bidding_amount;
    const biddingTime = result.detail.bidding_time // Format bidding time to MM-DD-YYYY

    if (!companies[companyName]) {
      companies[companyName] = {
        biddingAmounts: Array(data.result.length).fill(null), // Create array with null values
        biddingTimes: Array(data.result.length).fill(null)
      }
    }

    const index = data.result.length - data.result.indexOf(result) - 1; // Calculate the index from the end
    // companies[companyName][index] = biddingAmount; // Insert the bidding amount at the calculated index
    companies[companyName].biddingAmounts[index] = biddingAmount; // Insert the bidding amount at the calculated index
    companies[companyName].biddingTimes[index] = biddingTime; // Insert the bidding time at the calculated index
  });

  const transformedData = Object.entries(companies).map(([companyName, { biddingAmounts, biddingTimes }], index) => {
    biddingAmounts.unshift(null); // Add null at the beginning of the array
    biddingTimes.unshift(null); // Add null at the beginning of the array
    return {
      label: companyName,
      data: biddingAmounts,
      date: biddingTimes,
      borderColor: "#000",
      fill: false,
      pointBorderColor: "#fff",
      pointRadius: 7,
      pointBackgroundColor: colors[index].hex,
    }
  });

  // จัด data ให้เส้น
  const sortedBiddingAmounts = data.result.map(item => item.detail.bidding_amount).sort((a, b) => a - b);
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
  console.log("english:", chartEngData)
  return chartEngData
}

const computeDataSealedReverse = (data) => {
  const result = [];
  const companyData = {};

  [...data.result].reverse().forEach((item, index, arr) => {
    const { company_name, bidding_amount, bidding_time } = item.detail;
    if (!companyData[company_name]) {
      companyData[company_name] = [];
    }
    companyData[company_name].push({ bidding_amount, bidding_time });
  }, data.result.length - 1);

  console.log('companyData:', companyData)

  Object.entries(companyData).forEach(([key, value], index) => {
    let bids = value.map(item => item.bidding_amount)
    bids.unshift(null)
    let bidDate = value.map(item => item.bidding_time)
    bidDate.unshift(null)
    result.push({
      label: key,
      data: bids,
      date: bidDate,
      borderColor: colors[index].hex,
      fill: false,
      pointBorderColor: "#fff",
      pointRadius: 7,
      pointBackgroundColor: colors[index].hex,
    });
  });

  const chartEngData = {
    labels: labels,
    datasets: result
  }

  console.log('result sealed:', chartEngData);
  return chartEngData;
}

const computeDataSealedForward = (data) => {
  const result = [];
  const companyData = {};

  [...data.result].reverse().forEach((item, index, arr) => {
    const { company_name, bidding_amount, bidding_time } = item.detail;
    if (!companyData[company_name]) {
      companyData[company_name] = [];
    }
    companyData[company_name].push({ bidding_amount, bidding_time });
  }, data.result.length - 1);

  console.log('companyData:', companyData)

  Object.entries(companyData).forEach(([key, value], index) => {
    let bids = value.map(item => item.bidding_amount)
    bids.unshift(null)
    let bidDate = value.map(item => item.bidding_time)
    bidDate.unshift(null)
    result.push({
      label: key,
      data: bids,
      date: bidDate,
      borderColor: colors[index].hex,
      fill: false,
      pointBorderColor: "#fff",
      pointRadius: 7,
      pointBackgroundColor: colors[index].hex,
    });
  });

  const chartEngData = {
    labels: labels,
    datasets: result
  }

  console.log('result sealed:', chartEngData);
  return chartEngData;
}


function App() {
  return (
    <Container maxWidth='xl' className='App'>
      <Stack direction='column' alignItems='center' spacing={4}>
        <AuctionChart
          title='English - Reverse'
          bidHistory={computeDataEnglishReverse(english_reverse)}
          auctionType={1}
        />
        <AuctionChart
          title='English - Forward'
          bidHistory={computeDataEnglishForward(english_forward)}
          auctionType={1}
        />
        <AuctionChart
          title='Sealed - Reverse'
          bidHistory={computeDataSealedReverse(sealed_reverse)}
          auctionType={2}
          reservedPrice={1000000}
        />
        <AuctionChart
          title='Sealed - Forward'
          bidHistory={computeDataSealedForward(sealed_forward)}
          auctionType={2}
          reservedPrice={1800000}
        />
      </Stack>
    </Container>
  )
}

export default App
