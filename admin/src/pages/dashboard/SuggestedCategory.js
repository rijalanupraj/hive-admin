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
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid
} from "@mui/material";

// routes
import useSettings from "../../hooks/useSettings";
// _mock_
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useSnackbar } from "notistack";
// sections
import {
  SuggestedListHead,
  SuggestedListToolbar,
  SuggestedMoreMenu
} from "../../sections/@dashboard/category/suggested";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  deleteCategory,
  getAllSuggestedCategory,
  toggleCategoryStatus
} from "../../redux/actions/categoryActions";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "title", label: "Title", alignRight: false },
  { id: "isactive", label: "isActive", alignRight: false },
  { id: "suggestedBy", label: "By", alignRight: false },
  {}
];

// ----------------------------------------------------------------------

export default function SuggestedCategory() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const category = useSelector(state => state.category);
  const { themeStretch } = useSettings();

  const [categoryList, setCategoryList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("title");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getAllSuggestedCategory());
  }, []);

  useEffect(() => {
    setCategoryList([...category.categoryList]);
  }, [category.categoryList]);

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDeleteCategory = categoryId => {
    dispatch(deleteCategory(categoryId, enqueueSnackbar));
  };

  const handleSelectAllClick = checked => {
    if (checked) {
      const newSelecteds = categoryList.map(n => n.title);
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
    const deleteUser = categoryList.filter(user => user.id !== userId);
    setSelected([]);
    setCategoryList(deleteUser);
  };

  const handleDeleteMultiUser = selected => {
    const deleteUsers = categoryList.filter(user => !selected.includes(user.name));
    setSelected([]);
    setCategoryList(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoryList.length) : 0;

  const filteredCategory = applySortFilter(categoryList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredCategory.length && Boolean(filterName);

  return (
    <Page title='Category: List'>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading='Suggested Category'
          links={[
            { name: "Dashboard", href: "/" },
            { name: "Category", href: "/" },
            { name: "Suggested" }
          ]}
        />

        <Card>
          <SuggestedListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SuggestedListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={categoryList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCategory &&
                    filteredCategory
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(row => {
                        const { _id, title, isActive, suggestedBy } = row;
                        const isItemSelected = selected.indexOf(title) !== -1;

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
                              <Checkbox
                                checked={isItemSelected}
                                onClick={() => handleClick(title)}
                              />
                            </TableCell>
                            <TableCell sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant='subtitle2' noWrap>
                                <Link href={"/"}>{title}</Link>
                              </Typography>
                            </TableCell>

                            <TableCell align='left'>
                              <Label
                                variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                                color={(isActive === false && "error") || "success"}
                              >
                                {sentenceCase(isActive ? "true" : "false")}
                              </Label>
                            </TableCell>

                            <TableCell>
                              <Typography variant='subtitle2' noWrap>
                                {suggestedBy?.username}
                              </Typography>
                            </TableCell>

                            <TableCell align='right'>
                              <SuggestedMoreMenu
                                onDelete={() => handleDeleteCategory(_id)}
                                onApprove={() =>
                                  dispatch(toggleCategoryStatus(_id, enqueueSnackbar))
                                }
                                userName={title}
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
            count={categoryList.length}
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
      category => category.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map(el => el[0]);
}
