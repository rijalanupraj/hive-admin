
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import CategoryNewForm from '../../sections/@dashboard/category/CategoryNewForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Category: Create New Category">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create New Category"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Category', href: PATH_DASHBOARD.category.list },
            { name: 'Create' },
          ]}
        />

        <CategoryNewForm />
      </Container>
    </Page>
  );
}
