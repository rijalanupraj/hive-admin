import { sentenceCase } from "change-case";
import { useState } from "react";
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
  Box,
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// _mock_
import { _userList } from "../../_mock";
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import {
  ReportUserListHead,
  ReportUserListToolbar,
  ReportUserMoreMenu,
} from "../../sections/@dashboard/report/userReportList";

import { useDispatch, useSelector } from "react-redux";
import { viewReportedUser } from "../../redux/actions/usersActions";
import { useEffect } from "react";
import { description } from "../../_mock/text";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "reported", label: "Reported To", alignRight: false },
  { id: "reportedby", label: "Reported By", alignRight: false },
  { id: "subject", label: "Subject", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "warn", label: "Warn", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [userReportList, setUserReportList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("subject");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(viewReportedUser());
  }, []);

  useEffect(() => {
    setUserReportList(users.userReports);
  }, [users.userReports]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = userReportList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteUser = (userId) => {
    const deleteUser = userReportList.filter((user) => user.id !== userId);
    setSelected([]);
    setUserReportList(deleteUser);
  };

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = userReportList.filter(
      (user) => !selected.includes(user.name)
    );
    setSelected([]);
    setUserReportList(deleteUsers);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - userReportList.length)
      : 0;

  const filteredUsers = applySortFilter(
    userReportList,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="User Reports"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: "List" },
          ]}
        />

        <Card>
          <ReportUserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ReportUserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userReportList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        reportedUser,
                        reportedBy,
                        subject,
                        description,
                        warn,
                      } = row;
                      const isItemSelected = selected.indexOf(_id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onClick={() => handleClick(_id)}
                            />
                          </TableCell>
                          <TableCell
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Avatar
                              alt={reportedUser.username}
                              src={
                                reportedUser?.profilePhoto?.hasPhoto
                                  ? reportedUser.profilePhoto.url
                                  : ""
                              }
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="subtitle2" noWrap>
                              {reportedUser.username}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                alt={reportedBy.username}
                                src={
                                  reportedBy?.profilePhoto?.hasPhoto
                                    ? reportedBy.profilePhoto.url
                                    : ""
                                }
                                sx={{ mr: 1 }}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {reportedBy.username}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="left">{subject}</TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">
                            {reportedUser.isWarned ? (
                              <Iconify
                                icon="icon-park-solid:correct
"
                                width={20}
                                height={20}
                                color="success.main"
                              />
                            ) : (
                              <Iconify
                                icon="entypo:circle-with-cross"
                                width={20}
                                height={20}
                                color="error.main"
                              />
                            )}
                          </TableCell>

                          <TableCell align="right">
                            <ReportUserMoreMenu
                              onDelete={() => handleDeleteUser(_id)}
                              userName={""}
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
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
            component="div"
            count={userReportList.length}
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
    return array.filter(
      (report) =>
        report.subject.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        report.reportedBy.username
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1 ||
        report.reportedUser.username
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
