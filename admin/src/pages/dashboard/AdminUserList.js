import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  Table,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  TextField,
  Grid,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Alert
} from "@mui/material";
import * as Yup from "yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

import { FormProvider, RHFSwitch, RHFTextField } from "../../components/hook-form";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// _mock_
import { _adminList } from "../../_mock";
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import {
  AdminListHead,
  AdminListToolbar,
  AdminMoreMenu
} from "../../sections/@dashboard/adminUser/list";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins, createAdmin, deleteAdminUser } from "../../redux/actions/usersActions";
import { create } from "lodash";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "email", label: "Email", alignRight: false },
  { id: "id", label: "Id", alignRight: false },
  { id: "superAdmin", label: "Super Admin", alignRight: false },
  { id: "" }
];

// ----------------------------------------------------------------------

export default function AdminUserList() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const auth = useSelector(state => state.auth);
  const { adminsList } = users;
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [adminList, setAdminList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("email");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllAdmins());
  }, []);

  useEffect(() => {
    setAdminList([...users.adminsList]);
  }, [users.adminsList]);

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = checked => {
    if (checked) {
      const newSelecteds = adminList.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = name => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = filterName => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteUser = userId => {
    const deleteUser = adminList.filter(user => user.id !== userId);
    setSelected([]);
    setAdminList(deleteUser);
  };

  const handleDeleteMultiUser = selected => {
    const deleteUsers = adminList.filter(user => !selected.includes(user.name));
    setSelected([]);
    setAdminList(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - adminList.length) : 0;

  const filteredUsers = applySortFilter(adminList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  const handleCreateUserAction = auth => {
    if (auth.me.superAdmin) {
      setDialogOpen(true);
    } else {
      enqueueSnackbar("You don't have permission to create new admin", {
        variant: "error"
      });
    }
  };

  return (
    <Page title='Admin User: List'>
      <CreateUserDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} users={users} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading='Admin List'
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Admin User", href: PATH_DASHBOARD.adminuser.root },
            { name: "List" }
          ]}
          action={
            <Button
              variant='contained'
              startIcon={<Iconify icon={"eva:plus-fill"} />}
              onClick={() => handleCreateUserAction(auth)}
            >
              New Admin
            </Button>
          }
        />

        <Card>
          <AdminListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <AdminListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={adminList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      const { _id, email, superAdmin } = row;
                      const isItemSelected = selected.indexOf(email) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role='checkbox'
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox checked={isItemSelected} onClick={() => handleClick(email)} />
                          </TableCell>
                          <TableCell align='left'>{email}</TableCell>
                          <TableCell align='left'>{_id}</TableCell>
                          <TableCell align='left'>{superAdmin ? "True" : "False"}</TableCell>
                          <TableCell align='right'>
                            {auth.me.superAdmin && auth.me._id !== _id && (
                              <AdminMoreMenu
                                onDelete={() => dispatch(deleteAdminUser(_id, enqueueSnackbar))}
                                userName={email}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={adminList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter(admin => admin.email.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map(el => el[0]);
}

const CreateUserDialog = ({ dialogOpen, setDialogOpen, users }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async () => {
    try {
      dispatch(createAdmin(values, enqueueSnackbar));
      reset();
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const NewUserSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    superAdmin: Yup.boolean().required("Super Admin is required")
  });

  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
      superAdmin: false
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = methods;

  const values = watch();

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose} maxWidth='lg'>
      <DialogTitle>Create Admin</DialogTitle>

      <DialogContent>
        <br />
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText>
        <br />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <RHFTextField name='email' label='Email' />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField
                name='password'
                label='Password'
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                        <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFSwitch name='superAdmin' label='Super Admin' />
            </Grid>

            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isSubmitting}
              sx={{ mt: 2, ml: 3 }}
            >
              Create Admin
            </LoadingButton>
            {users.createAdminError && <Alert severity='error'>{users.createAdminError}</Alert>}
          </Grid>
          <br />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
