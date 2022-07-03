// @mui
import { Grid, Container } from "@mui/material";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
// sections
import {
  QuestionSummary,
  UserWidgetSummary,
  WebsiteVisit,
} from "../../sections/@dashboard/general/dashboard";

// ----------------------------------------------------------------------

export default function GeneralDashboard() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary
              title="Total User"
              total={13}
              icon={
                <Iconify
                  icon={"ant-design:user-outlined"}
                  color="#1877F2"
                  width={50}
                  height={110}
                  ml={4}
                />
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary
              title="Active User"
              total={8}
              icon={
                <Iconify
                  icon={"icon-park-outline:right-user"}
                  color="#1877F2"
                  width={50}
                  height={110}
                  ml={4}
                />
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary
              title="New User"
              total={3}
              icon={
                <Iconify
                  icon={"icon-park-outline:add-user"}
                  color="#1877F2"
                  width={50}
                  height={110}
                  ml={4}
                />
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <UserWidgetSummary
              title="User Report"
              total={5}
              icon={
                <Iconify
                  icon={"ic:outline-bug-report"}
                  color="#1877F2"
                  width={50}
                  height={115}
                  ml={4}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <QuestionSummary />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <WebsiteVisit />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
