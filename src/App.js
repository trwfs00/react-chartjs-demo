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
import AuctionChart from "./components/SealedReverse/AuctionChart"

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

const chartData = {
  labels: labels,
  datasets: [
    {
      label: "โง่",
      data: [null, 1500000, null],
      borderColor: "#000", // Customize line color
      fill: false, // Do not fill area under the line
      pointBackgroundColor: "#043daf",
      pointBorderColor: "#fff",
      pointRadius: 7,
    },
    {
      label: "ฉลาด",
      data: [null, null, 1510000],
      borderColor: "#000", // Customize line color
      fill: false, // Do not fill area under the line
      pointBackgroundColor: "#52ad21",
      pointBorderColor: "#fff",
      pointRadius: 7,
    },
    {
      label: "ไม่ฉลาด",
      data: [null, null, null, 1505000],
      borderColor: "#000", // Customize line color
      fill: false, // Do not fill area under the line
      pointBackgroundColor: "#9123ad",
      pointBorderColor: "#fff",
      pointRadius: 7,
    },
    {
      data: [null, 1500000, 1510000, 1505000],
      borderColor: "#000", // Customize line color
      fill: false, // Do not fill area under the line
      pointStyle: false,
      pointRadius: 0,
      pointHoverRadius: 0,
      pointHitRadius: 0
    }
  ],
}

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
        />
      <Box sx={{ width: 900, height: 450 }}>
        <Line data={chartData} options={legendOptions} />
      </Box>
      </Stack>
    </Container>
  )
}

export default App
