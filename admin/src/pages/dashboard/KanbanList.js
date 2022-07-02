// External Import
import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  TableContainer,
  Table,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from "../../components/hook-form";

// Internal Import
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Iconify from "../../components/Iconify";
import useSettings from "../../hooks/useSettings";

import {
  KanbanListHead,
} from "../../sections/@dashboard/kanbanList";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
];

function KanbanList() {
  const { themeStretch } = useSettings();
  const [currentEditBoard, setCurrentEditBoard] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateEditBoard = (edit, board) => {
    setIsEdit(edit);
    if (board) {
      setCurrentEditBoard(board);
    } else {
      setCurrentEditBoard({});
    }
    setDialogOpen(true);
  };
  return (
    <Page title="Kanban" sx={{ height: 1 }}>
      <BoardPopUpDialog
        isEdit={isEdit}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        board={currentEditBoard}
      />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Kanban"
          links={[
            { name: "Dashboard", href: "/" },
            { name: "Category", href: "/" },
            { name: "List" },
          ]}
          action={
            <Button
              onClick={() => {
                handleCreateEditBoard(false);
              }}
              variant="contained"
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              New Board
            </Button>
          }
        />

        {/* start table */}

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <KanbanListHead headLabel={TABLE_HEAD} />
          </Table>
        </TableContainer>

        {/*end table */}
      </Container>
    </Page>
  );
}

export default KanbanList;

const BoardPopUpDialog = ({ dialogOpen, setDialogOpen, isEdit, board }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async () => {
    if (isEdit) {
      try {
        // dispatch(updateBoard(board._id, values, enqueueSnackbar));
        reset();
        setDialogOpen(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // dispatch(addNewBoard(values, enqueueSnackbar));
        reset();
        setDialogOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const CategorySchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  const defaultValues = useMemo(
    () => ({
      title: "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  useEffect(() => {
    if (isEdit) {
      setValue("title", board.title);
    } else {
      reset(defaultValues);
    }
  }, [isEdit, board]);

  const values = watch();

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose} maxWidth="lg">
      <DialogTitle>{isEdit ? "Edit Board" : "New Board"}</DialogTitle>

      <DialogContent>
        <br />
        <DialogContentText>
          {isEdit ? "Edit Board" : "New Board"}
        </DialogContentText>
        <br />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <RHFTextField name="title" label="Title" />
            </Grid>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ mt: 2, ml: 3 }}
            >
              {isEdit ? "Update" : "Create"}
            </LoadingButton>
          </Grid>
          <br />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
