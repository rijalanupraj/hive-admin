import { sentenceCase } from 'change-case'
import { useState, useEffect, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
// @mui
import { useTheme } from '@mui/material/styles'
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
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { FormProvider, RHFSwitch, RHFTextField } from '../../components/hook-form'
// routes
import useSettings from '../../hooks/useSettings'
// _mock_
// components
import Page from '../../components/Page'
import Label from '../../components/Label'
import Iconify from '../../components/Iconify'
import Scrollbar from '../../components/Scrollbar'
import SearchNotFound from '../../components/SearchNotFound'
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs'
import { useSnackbar } from 'notistack'
import { styled } from '@mui/material/styles'
import { RHFEditor, RHFUploadSingleFile } from '../../components/hook-form'

// sections
import { BadgeListHead, BadgeListToolbar, BadgeMoreMenu } from '../../sections/@dashboard/badge/list'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBadges, addNewBadge, updateBadge, deleteBadge } from '../../redux/actions/badgeActions'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}))

// ----------------------------------------------------------------------

const TABLE_HEAD = [{ id: 'title', label: 'Title', alignRight: false }, { id: '' }]

// ----------------------------------------------------------------------

export default function BadgeList() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const badge = useSelector(state => state.badge)
  const { themeStretch } = useSettings()
  const [dialogOpen, setDialogOpen] = useState(false)

  const [badgeList, setBadgeList] = useState([])
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState('title')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { enqueueSnackbar } = useSnackbar()

  const [currentEditBadge, setCurrentEditBadge] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    dispatch(getAllBadges())
  }, [])

  useEffect(() => {
    setBadgeList([...badge.badgeList])
  }, [badge.badgeList])

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleDeleteBadge = badgeId => {
    dispatch(deleteBadge(badgeId, enqueueSnackbar))
  }

  const handleSelectAllClick = checked => {
    if (checked) {
      const newSelecteds = badgeList.map(n => n.title)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = name => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterByName = filterName => {
    setFilterName(filterName)
    setPage(0)
  }

  const handleDeleteUser = userId => {
    const deleteUser = badgeList.filter(user => user.id !== userId)
    setSelected([])
    setBadgeList(deleteUser)
  }

  const handleDeleteMultiUser = selected => {
    const deleteUsers = badgeList.filter(user => !selected.includes(user.name))
    setSelected([])
    setBadgeList(deleteUsers)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - badgeList.length) : 0

  const filteredCategory = applySortFilter(badgeList, getComparator(order, orderBy), filterName)

  const isNotFound = !filteredCategory.length && Boolean(filterName)

  const handleCreateUpdateBadge = (edit, badge) => {
    setIsEdit(edit)
    if (badge) {
      setCurrentEditBadge(badge)
    } else {
      setCurrentEditBadge({})
    }
    setDialogOpen(true)
  }

  return (
    <Page title='Badge: List'>
      <CategoryPopUpDialog isEdit={isEdit} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} badge={currentEditBadge} />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Badge List'
          links={[{ name: 'Dashboard', href: '/' }, { name: 'Badge', href: '/' }, { name: 'Badge' }]}
          action={
            <Button
              variant='contained'
              onClick={() => {
                handleCreateUpdateBadge(false)
              }}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Badge
            </Button>
          }
        />

        <Card>
          <BadgeListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} onDeleteUsers={() => handleDeleteMultiUser(selected)} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <BadgeListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={badgeList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCategory &&
                    filteredCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                      const { _id, title, image } = row
                      const isItemSelected = selected.indexOf(title) !== -1

                      return (
                        <TableRow hover key={_id} tabIndex={-1} role='checkbox' selected={isItemSelected} aria-checked={isItemSelected}>
                          <TableCell padding='checkbox'>
                            <Checkbox checked={isItemSelected} onClick={() => handleClick(title)} />
                          </TableCell>
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt={title} src={image?.url} sx={{ mr: 1 }} />
                            <Typography variant='subtitle2' noWrap>
                              {title}
                            </Typography>
                          </TableCell>

                          <TableCell align='right'>
                            <BadgeMoreMenu onDelete={() => handleDeleteBadge(_id)} onEdit={() => handleCreateUpdateBadge(true, row)} userName={title} />
                          </TableCell>
                        </TableRow>
                      )
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
            count={badgeList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  )
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return array.filter(badge => badge.title.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  return stabilizedThis.map(el => el[0])
}

const CategoryPopUpDialog = ({ dialogOpen, setDialogOpen, isEdit, badge }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onSubmit = async () => {
    if (isEdit) {
      try {
        const formData = new FormData()
        formData.append('badgeImage', values.badgeImage)
        formData.append('title', values.title)
        dispatch(updateBadge(badge._id, formData, enqueueSnackbar))
        reset()
        setDialogOpen(false)
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const formData = new FormData()
        formData.append('badgeImage', values.badgeImage)
        formData.append('title', values.title)
        dispatch(addNewBadge(formData, enqueueSnackbar))
        reset()
        setDialogOpen(false)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const BadgeSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    badgeImage: !isEdit ? Yup.mixed().test('required', 'Badge is required', value => value !== '') : Yup.mixed(),
  })

  const defaultValues = useMemo(
    () => ({
      title: badge?.title || '',
      badgeImage: badge?.image?.url || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [badge]
  )

  const methods = useForm({
    resolver: yupResolver(BadgeSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  useEffect(() => {
    if (!isEdit) {
      reset(defaultValues)
    } else {
      setValue('title', badge.title)
      setValue('badgeImage', badge.image.url)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badge])

  useEffect(() => {
    if (isEdit) {
      setValue('title', badge.title)
      setValue('badgeImage', badge.image.url)
    } else {
      reset(defaultValues)
    }
  }, [isEdit, badge])

  const values = watch()

  const handleDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0]

      if (file) {
        setValue(
          'badgeImage',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      }
    },
    [setValue]
  )

  const handleClose = () => {
    setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen} onClose={handleClose} maxWidth='lg'>
      <DialogTitle>{isEdit ? 'Edit Badge' : 'New Badge'}</DialogTitle>

      <DialogContent>
        <br />
        <DialogContentText>{isEdit ? 'Edit Badge' : 'Add Badge'}</DialogContentText>
        <br />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <RHFTextField name='title' label='Title' />
            </Grid>
            <Grid item md={6}>
              <RHFUploadSingleFile name='badgeImage' accept='image/*' maxSize={3145728} onDrop={handleDrop} />
            </Grid>
            <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting} sx={{ mt: 2, ml: 3 }}>
              {isEdit ? 'Update' : 'Create'}
            </LoadingButton>
          </Grid>
          <br />
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
