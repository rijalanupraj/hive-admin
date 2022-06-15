import { paramCase, capitalCase } from "change-case";
import { useParams, useLocation } from "react-router-dom";
// @mui
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// _mock_
import { _userList } from "../../_mock";
// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import AdminNewForm from "../../sections/@dashboard/adminUser/AdminNewForm";

// ----------------------------------------------------------------------

export default function AdminCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { name = "" } = useParams();
  const isEdit = pathname.includes("edit");

  return (
    <Page title='User: Create a new user'>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Create a new user" : "Edit user"}
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Admin", href: PATH_DASHBOARD.adminuser.list },
            { name: !isEdit ? "New Admin" : capitalCase(name) }
          ]}
        />

        <AdminNewForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
