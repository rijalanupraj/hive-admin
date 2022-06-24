import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
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
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";

import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, RHFSwitch, RHFTextField } from "../../components/hook-form";

// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from "../../sections/@dashboard/user/list";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
  toggleBanUser,
  verifyUserToggle,
  warnUser
} from "../../redux/actions/usersActions";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "username", label: "UserName", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "following", label: "Following", alignRight: false },
  { id: "follower", label: "Follower", alignRight: false },
  { id: "isEmailVerified", label: "Email Verified", alignRight: false },
  { id: "isUserVerified", label: "User Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" }
];

// ----------------------------------------------------------------------

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [usersList, setUsersList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const [currentWarnUser, setCurrentWarnUser] = useState({});

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    setUsersList(users.usersList);
  }, [users.usersList]);

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = checked => {
    if (checked) {
      const newSelecteds = usersList.map(n => n.name);
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
    const deleteUser = usersList.filter(user => user.id !== userId);
    setSelected([]);
  };

  const handleDeleteMultiUser = selected => {
    const deleteUsers = usersList.filter(user => !selected.includes(user.name));
    setSelected([]);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  const filteredUsers = applySortFilter(usersList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  const handleWarnUser = user => {
    if (user) {
      setCurrentWarnUser(user);
      setTimeout(() => {
        setDialogOpen(true);
      });
    }
  };

  if (users.isLoading || !users.usersList) {
    return <h1>Loading</h1>;
  }
  return (
    <Page title='User: List'>
      <WarnUserDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        user={currentWarnUser}
      />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading='User List'
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Profile", href: PATH_DASHBOARD.user.root },
            { name: "List" }
          ]}
        />

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={usersList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(user => {
                      console.log(user);
                      const isItemSelected = selected.indexOf(user.username) !== -1;

                      return (
                        <TableRow
                          hover
                          key={user._id}
                          tabIndex={-1}
                          role='checkbox'
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              checked={isItemSelected}
                              onClick={() => handleClick(user.username)}
                            />
                          </TableCell>
                          <TableCell sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              alt={user.username}
                              src={user?.profilePhoto?.hasPhoto ? user.profilePhoto.url : ""}
                              sx={{ mr: 1 }}
                            />
                            <Typography variant='subtitle2' noWrap>
                              {user.name}
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>{user.username}</TableCell>
                          <TableCell align='left'>{user.email}</TableCell>
                          <TableCell align='left'>{user.followings.length}</TableCell>
                          <TableCell align='left'>{user.followers.length}</TableCell>
                          <TableCell align='left'>
                            {user.isEmailVerified ? (
                              <Iconify
                                icon='icon-park-solid:correct'
                                width={20}
                                height={20}
                                color='success.main'
                              />
                            ) : (
                              <Iconify
                                icon='entypo:circle-with-cross'
                                width={20}
                                height={20}
                                color='red'
                              />
                            )}
                          </TableCell>
                          <TableCell align='left'>
                            {user.isVerified ? (
                              <Iconify
                                icon='fe:check-verified'
                                width={20}
                                height={20}
                                color='#3971f1'
                              />
                            ) : (
                              <Iconify
                                icon='entypo:circle-with-cross'
                                width={20}
                                height={20}
                                color='red'
                              />
                            )}
                          </TableCell>
                          <TableCell align='left'>
                            <Label
                              variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                              color={(user.isBanned && "error") || "success"}
                            >
                              {sentenceCase(user.isBanned ? "banned" : "Not banned")}
                            </Label>
                          </TableCell>

                          <TableCell align='right'>
                            <UserMoreMenu
                              verifyToggle={() => {
                                dispatch(verifyUserToggle(user._id, enqueueSnackbar));
                              }}
                              warnUser={() => {
                                handleWarnUser(user);
                              }}
                              onDelete={() => dispatch(deleteUser(user._id, enqueueSnackbar))}
                              banToggle={() => dispatch(toggleBanUser(user._id, enqueueSnackbar))}
                              userName={user.username}
                            />
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
            count={usersList.length}
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
  console.log(array);
  if (query) {
    return array.filter(_user => {
      return (
        (_user.name && _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
        _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
  }
  return stabilizedThis.map(el => el[0]);
}

const WarnUserDialog = ({ dialogOpen, setDialogOpen, user }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async () => {
    try {
      dispatch(warnUser(user._id, values, enqueueSnackbar));
      reset();
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const CategorySchema = Yup.object().shape({
    reason: Yup.string().required("Reason is required"),
    description: Yup.string().required("Description is required")
  });

  const defaultValues = useMemo(
    () => ({
      reason: "",
      description: ""
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
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
      <DialogTitle>Warn User</DialogTitle>

      <DialogContent>
        <br />
        <DialogContentText>Warn User {user?.username} </DialogContentText>
        <br />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <RHFTextField name='reason' label='Reason' />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name='description' label='Description' />
            </Grid>
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isSubmitting}
              sx={{ mt: 2, ml: 3 }}
            >
              Warn User
            </LoadingButton>
          </Grid>
          <br />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
