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
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material"
import ChartBox from "./components/ChartBox/ChartBox"
import "chartjs-plugin-zoom"
import chartOption from "./utils/constraint/chartOption"
import { data_sealed_reverse } from "./utils/constraint/dataset"
import { useRef, useState } from "react"
import CustomLegend from "./components/CustomLegend/CustomLegend"
import LineChart from "./components/SealedReverse/LineChart"

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
  const chartRef = useRef(null)
  const [chartSize, setChartSize] = useState("All")
  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom()
    }
  }

  const handleChange = e => {
    let size = e.target.value
    if (size) {
      setChartSize(size)
      if (chartRef.current && Number.isInteger(size)) {
        chartRef.current.zoomScale("x", { min: 0, max: size }, "default")
      }
    }
    console.log(chartRef.current.getZoomLevel())
  }

  return (
    <Container maxWidth='xl' className='App'>
      <LineChart
        title='Sealed - Reverse'
        dataset={data_sealed_reverse(10)}
        option={chartOption.zoomOption}
      />
    </Container>
  )
}

export default App
