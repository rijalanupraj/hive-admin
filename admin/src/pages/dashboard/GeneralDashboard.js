// @mui
import { Grid, Container } from '@mui/material'
// hooks
import useSettings from '../../hooks/useSettings'
// components
import Page from '../../components/Page'
import Iconify from '../../components/Iconify'
// sections
import { QuestionSummary, UserWidgetSummary, WebsiteVisit } from '../../sections/@dashboard/general/dashboard'
import { getSystemAnalytics } from '../../redux/actions/dashboardActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

// ----------------------------------------------------------------------

export default function GeneralDashboard() {
  const dashboard = useSelector(state => state.dashboard)
  const dispatch = useDispatch()
  const { themeStretch } = useSettings()
  const { stats } = dashboard

  useEffect(() => {
    dispatch(getSystemAnalytics())
  }, [])

  if (dashboard.isLoading || !dashboard.stats) {
    return <div>Loading...</div>
  }

  return (
    <Page title='General: Banking'>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary title='Total User' total={stats?.totalusers} icon={<Iconify icon={'ant-design:user-outlined'} color='#1877F2' width={50} height={110} ml={4} />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary title='Verified User' total={stats?.totalVerifiedUsers} icon={<Iconify icon={'icon-park-outline:right-user'} color='#1877F2' width={50} height={110} ml={4} />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary title='Total Banned Users' total={stats?.totalBannedUsers} icon={<Iconify icon={'icon-park-outline:add-user'} color='#1877F2' width={50} height={110} ml={4} />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary title='Total Solutions' total={stats?.totalSolutions} icon={<Iconify icon={'ant-design:user-outlined'} color='#1877F2' width={50} height={110} ml={4} />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary title='Total Questions' total={stats?.totalQuestions} icon={<Iconify icon={'icon-park-outline:right-user'} color='#1877F2' width={50} height={110} ml={4} />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary title='Total Hide Solutions' total={stats?.totalHideSolutions} icon={<Iconify icon={'icon-park-outline:right-user'} color='#1877F2' width={50} height={110} ml={4} />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary title='Total Hide Questions' total={stats?.totalHideQuestions} icon={<Iconify icon={'icon-park-outline:right-user'} color='#1877F2' width={50} height={110} ml={4} />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary title='User Report' total={5} icon={<Iconify icon={'ic:outline-bug-report'} color='#1877F2' width={50} height={115} ml={4} />} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <QuestionSummary stats={stats} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <WebsiteVisit />
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}
