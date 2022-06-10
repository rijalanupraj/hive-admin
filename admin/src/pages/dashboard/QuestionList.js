import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
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
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _questionList } from '../../_mock';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { QuestionListHead, QuestionListToolbar, QuestionMoreMenu } from '../../sections/@dashboard/question/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'UserName', alignRight: false },
  { id: 'id', label: 'Question ID', alignRight: false },
  { id: 'question', label: 'Question', alignRight: false },
  { id: 'solution', label: 'Solution', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  {}
];

// ----------------------------------------------------------------------

export default function QuestionList() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const [questionList, setQuestionList] = useState(_questionList);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterQuestion, setFilterQuestion] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = questionList.map((n) => n.name);
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
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterQuestion) => {
    setFilterQuestion(filterQuestion);
    setPage(0);
  };

  const handleDeleteUser = (userId) => {
    const deleteUser = questionList.filter((user) => user.id !== userId);
    setSelected([]);
    setQuestionList(deleteUser);
  };

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = questionList.filter((user) => !selected.includes(user.name));
    setSelected([]);
    setQuestionList(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questionList.length) : 0;

  const filterQuestions = applySortFilter(questionList, getComparator(order, orderBy), filterQuestion);

  const isNotFound = !filterQuestions.length && Boolean(filterQuestion);

  return (
    <Page title="Question: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Question List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'List' },
          ]}
        />

        <Card>
          <QuestionListToolbar
            numSelected={selected.length}
            filterQuestion={filterQuestion}
            onFilterQuestion={handleFilterByName}
            onDeleteQuestions={() => handleDeleteMultiUser(selected)}
          />
          

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <QuestionListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={questionList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filterQuestions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, question, status, avatarUrl, solution } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }}/>
                          <Typography variant="subtitle2" noWrap>
                          <Link href={PATH_DASHBOARD.user.root}>{name}</Link>
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{question}</TableCell>
                        <TableCell align="left">{solution}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(status === 'hidden' && 'error') || 'success'}
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <QuestionMoreMenu onDelete={() => handleDeleteUser(id)} userName={name} />
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
            component="div"
            count={questionList.length}
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
  return order === 'desc'
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
    return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
