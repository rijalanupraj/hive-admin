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
  Link,
  Box
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// _mock_
import { _solutionList } from "../../_mock";
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import {
  SolutionListHead,
  SolutionListToolbar,
  SolutionMoreMenu
} from "../../sections/@dashboard/solution/list";
import { deleteSolution, viewReportedSolutions } from "../../redux/actions/solutionActions";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "answer", label: "Answer", alignRight: false },
  { id: "answerid", label: "Id", alignRight: false },
  { id: "question", label: "Question", alignRight: false },
  { id: "author", label: "Author", alignRight: false },
  { id: "reportedBy", label: "Reported By", alignRight: false },
  { id: "subject", label: "Subject", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  {}
];

// ----------------------------------------------------------------------

export default function ReportSolutionList() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const solution = useSelector(state => state.solution);

  const [solutionList, setSolutionList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("subject");
  const [filterSolution, setFilterSolution] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(viewReportedSolutions());
  }, []);

  useEffect(() => {
    setSolutionList(solution.solutionReports);
  }, [solution.solutionReports]);

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = checked => {
    if (checked) {
      const newSelecteds = solutionList.map(n => n.name);
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

  const handleFilterByName = filterSolution => {
    setFilterSolution(filterSolution);
    setPage(0);
  };

  const handleDeleteSolution = solutionId => {
    dispatch(deleteSolution(solutionId));
  };

  const handleDeleteMultiUser = selected => {
    const deleteUsers = solutionList.filter(user => !selected.includes(user.name));
    setSelected([]);
    setSolutionList(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - solutionList.length) : 0;

  console.log(solutionList);
  const filterSolutions = applySortFilter(
    solutionList,
    getComparator(order, orderBy),
    filterSolution
  );

  const isNotFound = !filterSolutions.length && Boolean(filterSolution);

  return (
    <Page title='Solution: List'>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading='Reported Solutions'
          links={[{ name: "Dashboard", href: PATH_DASHBOARD.root }, { name: "List" }]}
        />

        <Card>
          <SolutionListToolbar
            numSelected={selected.length}
            filterSolution={filterSolution}
            onFilterSolution={handleFilterByName}
            onDeleteSolutions={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SolutionListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={solutionList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filterSolutions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      const { _id, reportedSolution, reportedBy, subject, description } = row;
                      const isItemSelected = selected.indexOf("") !== -1;

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
                            <Checkbox checked={isItemSelected} onClick={() => handleClick("")} />
                          </TableCell>
                          <TableCell align='left'>{reportedSolution.answer.slice(0, 20)}</TableCell>

                          <TableCell align='left'>{reportedSolution._id}</TableCell>
                          <TableCell align='left'>{reportedSolution.question.title}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                alt={reportedSolution?.user?.username}
                                src={
                                  reportedSolution?.user?.profilePhoto?.hasPhoto
                                    ? reportedSolution.user.profilePhoto.url
                                    : ""
                                }
                                sx={{ mr: 1 }}
                              />
                              <Typography variant='subtitle2' noWrap>
                                {reportedSolution?.user.username}
                              </Typography>
                            </Box>
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
                              <Typography variant='subtitle2' noWrap>
                                {reportedBy.username}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align='left'>{subject}</TableCell>
                          <TableCell align='left'>{description}</TableCell>

                          <TableCell align='right'>
                            <SolutionMoreMenu
                              onDelete={() => handleDeleteSolution(_id)}
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
                      <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterSolution} />
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
            count={solutionList.length}
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
      report =>
        report.subject.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        report.reportedBy.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        report.reportedSolution.answer.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        report.reportedSolution.user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        report.reportedSolution.question.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        report.reportedSolution._id.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map(el => el[0]);
}
