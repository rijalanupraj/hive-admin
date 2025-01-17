import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSnackbar } from "notistack";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  Table,
  Avatar,
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
import { useDispatch, useSelector } from "react-redux";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// _mock_
import { _questionList } from "../../_mock";
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import {
  CommentListHead,
  CommentListToolbar,
  CommentMoreMenu
} from "../../sections/@dashboard/comment/list";
import { getAllComments, deleteComment } from "../../redux/actions/commentActions";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "user", label: "User", alignRight: false },
  { id: "text", label: "Comment", alignRight: false },
  { id: "solution", label: "Solution", alignRight: false },
  {}
];

// ----------------------------------------------------------------------

export default function QuestionList() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const comment = useSelector(state => state.comment);
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();

  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("text");
  const [filterQuestion, setFilterQuestion] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  useEffect(() => {
    setCommentList(comment.comments);
  }, [comment.comments]);

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = checked => {
    if (checked) {
      const newSelecteds = commentList.map(n => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = id => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleFilterByName = filterQuestion => {
    setFilterQuestion(filterQuestion);
    setPage(0);
  };

  const handleDeleteQuestion = questionId => {
    // dispatch(deleteQuestion(questionId, enqueueSnackbar));
  };

  const handleDeleteMultiUser = selected => {
    const deleteUsers = commentList.map(user => !selected.includes(user.name));
    setSelected([]);
    // setQuestionList(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - commentList.length) : 0;

  const filterQuestions = applySortFilter(
    commentList,
    getComparator(order, orderBy),
    filterQuestion
  );

  const isNotFound = !filterQuestions.length && Boolean(filterQuestion);

  return (
    <Page title='Question: List'>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading='Question List'
          links={[{ name: "Dashboard", href: PATH_DASHBOARD.root }, { name: "List" }]}
        />

        <Card>
          <CommentListToolbar
            numSelected={selected.length}
            filterQuestion={filterQuestion}
            onFilterName={handleFilterByName}
            onDeleteQuestions={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CommentListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={commentList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filterQuestions.length > 0 &&
                    filterQuestions
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(row => {
                        const { _id, text, user, solution } = row;
                        const isItemSelected = selected.indexOf(_id) !== -1;

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
                              <Checkbox checked={isItemSelected} onClick={() => handleClick(_id)} />
                            </TableCell>
                            <TableCell sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                alt={user.username}
                                src={user?.profilePhoto?.hasPhoto ? user.profilePhoto.url : ""}
                                sx={{ mr: 2 }}
                              />
                              <Typography variant='subtitle2' noWrap>
                                {user.username}
                              </Typography>
                            </TableCell>
                            <TableCell align='left'>{text}</TableCell>

                            <TableCell align='left'>{solution._id}</TableCell>
                            <TableCell align='right'>
                              <CommentMoreMenu
                                onDelete={() => {
                                  dispatch(deleteComment(_id, enqueueSnackbar));
                                }}
                                onHideToggle={""}
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
                        <SearchNotFound searchQuery={filterQuestion} />
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
            count={commentList.length}
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
      _comment =>
        _comment.text.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _comment.user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _comment.solution._id.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map(el => el[0]);
}
