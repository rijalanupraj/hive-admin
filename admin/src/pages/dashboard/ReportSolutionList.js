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
import { getAllSolutions, deleteSolution } from "../../redux/actions/solutionActions";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "content", label: "Content", alignRight: false },
  { id: "question", label: "Question", alignRight: false },
  { id: "name", label: "UserName", alignRight: false },
  { id: "upvotedownvote", label: "Upvote/Downvote", alignRight: false },
  { id: "comment", label: "Comment", alignRight: false },
  { id: "isActive", label: "Is Active", alignRight: false },
  { id: "tags", label: "Tags", alignRight: false },
  {}
];

// ----------------------------------------------------------------------

export default function ReportSolutionList() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const solution = useSelector(state => state.solution);

  useEffect(() => {
    dispatch(getAllSolutions());
  }, []);

  const [solutionList, setSolutionList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("question");
  const [filterSolution, setFilterSolution] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setSolutionList(solution.solutionsList);
  }, [solution.solutionsList]);

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
          heading='Solution List'
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
                      const {
                        user,
                        question,
                        _id,
                        tags,
                        isActive,
                        comments,
                        answer,
                        upVotes,
                        downVotes
                      } = row;
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
                          <TableCell align='left'>{answer.slice(0, 20)}</TableCell>
                          <TableCell align='left'>{question?.title}</TableCell>
                          <TableCell sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              alt={user.username}
                              src={user?.profilePhoto?.hasPhoto ? user.profilePhoto.url : ""}
                              sx={{ mr: 2 }}
                            />
                            <Typography variant='subtitle2' noWrap>
                              <Link href={PATH_DASHBOARD.user.root}>{user.username}</Link>
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            {upVotes.length}/{downVotes.length}
                          </TableCell>
                          <TableCell align='left'>{comments.length}</TableCell>
                          <TableCell align='left'>{isActive ? "true" : "false"}</TableCell>
                          <TableCell align='left'>
                            {tags.map(tag => {
                              return (
                                <Label
                                  variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                                  color={"success"}
                                >
                                  {sentenceCase(tag)}
                                </Label>
                              );
                            })}
                          </TableCell>

                          <TableCell align='right'>
                            <SolutionMoreMenu
                              onDelete={() => handleDeleteSolution(_id)}
                              userName={user.name}
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
      _solution =>
        _solution?.question?.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _solution.user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _solution.answer.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map(el => el[0]);
}
