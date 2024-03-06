import { colors } from "../constraint/colors"

class computeService {
  constructor() { 
    this.labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    this.colors = colors
  }
  COMPUTE_AUCTION_ENGLISH = async dataset => {
    let companies = {}

    dataset.result.forEach(result => {
      const companyName = result.detail.company_name
      const biddingAmount = result.detail.bidding_amount
      const biddingTime = new Date(result.detail.bidding_time) // Format bidding time to MM-DD-YYYY

      if (!companies[companyName]) {
        companies[companyName] = {
          biddingAmounts: Array(dataset.result.length).fill(null), // Create array with null values
          biddingTimes: Array(dataset.result.length).fill(null),
        }
      }

      const index = dataset.result.length - dataset.result.indexOf(result) - 1 // Calculate the index from the end
      // companies[companyName][index] = biddingAmount; // Insert the bidding amount at the calculated index
      companies[companyName].biddingAmounts[index] = biddingAmount // Insert the bidding amount at the calculated index
      companies[companyName].biddingTimes[index] = biddingTime // Insert the bidding time at the calculated index
    })

    const transformedData = Object.entries(companies).map(
      ([companyName, { biddingAmounts, biddingTimes }], index) => {
        biddingAmounts.unshift(null) // Add null at the beginning of the array
        biddingTimes.unshift(null) // Add null at the beginning of the array
        return {
          label: companyName,
          data: biddingAmounts,
          date: biddingTimes,
          borderColor: "#000",
          fill: false,
          pointBorderColor: "#fff",
          pointRadius: 7,
          pointBackgroundColor: this.colors[index].hex,
        }
      }
    )

    // จัด data ให้เส้น
    const sortedBiddingAmounts = dataset.result
      .map(item => item.detail.bidding_amount)
      .sort((a, b) => b - a)
    sortedBiddingAmounts.unshift(null)

    const chartEngData = {
      labels: this.labels,
      datasets: [
        ...transformedData,
        {
          data: sortedBiddingAmounts,
          borderColor: "#000",
          fill: false,
          pointStyle: false,
          pointRadius: 0,
          pointHoverRadius: 0,
          pointHitRadius: 0,
        },
      ],
    }
    console.log("english:", chartEngData)
    return chartEngData
  }

  COMPUTE_AUCTION_SEALED = async dataset => {
    const result = []
    const companyData = {}

    dataset.result.forEach(item => {
      const { company_name, bidding_amount, bidding_time } = item.detail
      if (!companyData[company_name]) {
        companyData[company_name] = []
      }
      companyData[company_name].push({ bidding_amount, bidding_time })
    })

    console.log("companyData:", companyData)

    Object.entries(companyData).forEach(([key, value], index) => {
      let bids = value.map(item => item.bidding_amount)
      // let bidDate = value.map(item => Date(item.bidding_time))
      // console.log(bidDate)
      result.push({
        label: key,
        data: bids,
        // date: bidDate,
        borderColor: this.colors[index].hex,
        fill: false,
        pointBorderColor: "#fff",
        pointRadius: 7,
        pointBackgroundColor: this.colors[index].hex,
      })
    })

    const chartEngData = {
      labels: this.labels,
      datasets: result,
    }

    console.log("result sealed:", chartEngData)
    return chartEngData
  }
}

export default new computeService()
