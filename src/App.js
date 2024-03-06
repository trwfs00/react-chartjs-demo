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
import ChartTest from "./components/test"
import CustomLegendChart from "./components/test"

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
      </Stack>
    </Container>
  )
}

export default App
