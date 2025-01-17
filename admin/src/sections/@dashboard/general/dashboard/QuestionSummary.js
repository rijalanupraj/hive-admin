import merge from 'lodash/merge'
import ReactApexChart from 'react-apexcharts'
// @mui
import { useTheme, styled } from '@mui/material/styles'
import { Card, CardHeader } from '@mui/material'
// utils
import { fNumber } from '../../../../utils/formatNumber'
//
import { BaseOptionChart } from '../../../../components/chart'

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392
const LEGEND_HEIGHT = 72

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}))

// ----------------------------------------------------------------------

export default function QuestionSummary({ stats }) {
  const theme = useTheme()

  const CHART_DATA = [(stats.totalUnansweredQuestions / stats.totalSolutions) * 100, ((stats.totalSolutions - stats.totalUnansweredQuestions) / stats.totalSolutions) * 100]

  const chartOptions = merge(BaseOptionChart(), {
    labels: ['Unanswered Question', 'Answered Question'],
    legend: { floating: true, horizontalAlign: 'center' },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            {
              offset: 0,
              color: theme.palette.primary.light,
            },
            {
              offset: 100,
              color: theme.palette.primary.main,
            },
          ],
          [
            {
              offset: 0,
              color: theme.palette.warning.light,
            },
            {
              offset: 100,
              color: theme.palette.warning.main,
            },
          ],
        ],
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        dataLabels: {
          value: { offsetY: 16 },
          total: {
            formatter: () => fNumber(stats.totalSolutions),
          },
        },
      },
    },
  })

  return (
    <Card>
      <CardHeader title='Questions' />
      <ChartWrapperStyle dir='ltr'>
        <ReactApexChart type='radialBar' series={CHART_DATA} options={chartOptions} height={310} />
      </ChartWrapperStyle>
    </Card>
  )
}
