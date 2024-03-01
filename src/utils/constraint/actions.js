export const actions = [
  {
    name: "Toggle Point Style",
    handler(chart) {
      chart.options.plugins.legend.labels.usePointStyle =
        !chart.options.plugins.legend.labels.usePointStyle
      chart.update()
    },
  },
]
