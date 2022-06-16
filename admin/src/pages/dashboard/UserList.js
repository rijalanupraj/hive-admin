import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
  Link
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
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
import { getAllUsers } from "../../redux/actions/usersActions";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "username", label: "UserName", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "following", label: "Following", alignRight: false },
  { id: "follower", label: "Follower", alignRight: false },
  { id: "isEmailVerified", label: "Email Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" }
];

// ----------------------------------------------------------------------

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const { usersList } = users;
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

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

  const filteredUsers = applySortFilter(users.usersList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  if (users.isLoading || users.usersList.length === 0) {
    return <h1>Loading</h1>;
  }
  return (
    <Page title='User: List'>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading='User List'
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Profile", href: PATH_DASHBOARD.user.root },
            { name: "List" }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_DASHBOARD.user.newUser}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              New User
            </Button>
          }
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
                              sx={{ mr: 2 }}
                            />
                            <Typography variant='subtitle2' noWrap>
                              <Link href={PATH_DASHBOARD.user.root}>{user.name}</Link>
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>{user.username}</TableCell>
                          <TableCell align='left'>{user.email}</TableCell>
                          <TableCell align='left'>{user.followings.length}</TableCell>
                          <TableCell align='left'>{user.followers.length}</TableCell>
                          <TableCell align='left'>{user.isEmailVerified ? "Yes" : "No"}</TableCell>
                          <TableCell align='left'>
                            <Label
                              variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                              color={(user.isEmailVerified === "banned" && "error") || "success"}
                            >
                              {sentenceCase(user.username)}
                            </Label>
                          </TableCell>

                          <TableCell align='right'>
                            <UserMoreMenu
                              onDelete={() => handleDeleteUser(user._id)}
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
