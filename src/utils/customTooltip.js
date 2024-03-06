export const getOrCreateTooltip = chart => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div")

  if (!tooltipEl) {
    tooltipEl = document.createElement("div")
    tooltipEl.style.background = "rgba(11, 78, 128, 0.9)"
    tooltipEl.style.borderRadius = "4px"
    tooltipEl.style.color = "white"
    tooltipEl.style.opacity = 1
    tooltipEl.style.pointerEvents = "none"
    tooltipEl.style.position = "absolute"
    tooltipEl.style.transform = "translate(10%, -50%)"
    tooltipEl.style.transition = "all .1s ease"

    const table = document.createElement("table")
    table.style.margin = "0px"

    const caret = document.createElement("div")
    caret.style.height = "20px"
    caret.style.width = "20px"
    caret.style.backgroundColor = "rgba(11, 78, 128, 0.9)"
    caret.style.clipPath = "polygon(50% 0%, 50% 50%, 50% 100%, 0% 50%)"
    caret.style.top = "50%"
    caret.style.transform = "translate(-80%, -50%)"
    caret.style.position = "absolute"

    tooltipEl.appendChild(caret)
    tooltipEl.appendChild(table)
    chart.canvas.parentNode.appendChild(tooltipEl)
  }

  return tooltipEl
}

export const externalTooltipHandler = context => {
  // Tooltip Element
  const { chart, tooltip } = context
  const tooltipEl = getOrCreateTooltip(chart)

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0
    return
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || []
    const bodyLines = tooltip.body.map(b => b.lines)

    const tableHead = document.createElement("thead")

    // customize title here
    titleLines.forEach(title => {
      const tr = document.createElement("tr")
      tr.style.borderWidth = 0

      const th = document.createElement("th")
      th.style.borderWidth = 0
      th.style.textAlign = 'left'
      th.style.fontFamily = 'Prompt, sans-serif'
      th.style.fontSize = '13px'
      th.style.fontWeight = '600'
      const text = document.createTextNode(`Bid No. ${title}`)

      th.appendChild(text)
      tr.appendChild(th)
      tableHead.appendChild(tr)
    })

    // customize label here
    const tableBody = document.createElement("tbody")
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i]

      const span = document.createElement("span")
      span.style.background = colors.backgroundColor
      span.style.borderColor = colors.borderColor
      span.style.borderWidth = "2px"
      span.style.marginTop = "4px"
      span.style.marginRight = "10px"
      span.style.transform = "translateY(1.5px)"
      span.style.height = "12px"
      span.style.width = "12px"
      span.style.borderRadius = "50%"
      span.style.outline = "2px solid #fff"
      span.style.display = "inline-block"

      const tr = document.createElement("tr")
      tr.style.backgroundColor = "inherit"
      tr.style.borderWidth = 0

      const td = document.createElement("td")
      td.style.borderWidth = 0
      td.style.fontFamily = 'Prompt, sans-serif'
      td.style.fontSize = '13px'
      td.style.fontWeight = '600'

      td.appendChild(span)
      
      body.forEach(item => {
        const span1 = document.createElement("span")
        const p2 = document.createElement("p")
        const p3 = document.createElement("p")
        const label = document.createTextNode(item.label)
        const bidAmount = document.createTextNode(item.bidAmount)
        const date = document.createTextNode(item.date)

        p2.style.margin = '0px'
        p3.style.margin = '0px'

        span1.appendChild(label)
        p2.appendChild(bidAmount)
        p3.appendChild(date)
        td.appendChild(span1)
        td.appendChild(p2)
        td.appendChild(p3)
      })

      tr.appendChild(td)
      tableBody.appendChild(tr)
    })

    const tableRoot = tooltipEl.querySelector("table")

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove()
    }

    // Add new children
    tableRoot.appendChild(tableHead)
    tableRoot.appendChild(tableBody)
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1
  tooltipEl.style.left = positionX + tooltip.caretX + "px"
  tooltipEl.style.top = positionY + tooltip.caretY + "px"
  tooltipEl.style.font = tooltip.options.bodyFont.string
  tooltipEl.style.padding =
  tooltip.options.padding + "px " + tooltip.options.padding + "px"
}
