import { useState, useRef, useEffect } from "react";
// @mui
import { OutlinedInput, Paper, Button, ClickAwayListener } from "@mui/material";
// redux
import { useDispatch } from "../../../redux/store";
import { createColumn } from "../../../redux/slices/kanban";
// components
import Iconify from "../../../components/Iconify";
import { createKanbanList } from "../../../redux/actions/kanbanActions";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------

export default function KanbanColumnAdd({ boardId }) {
  const nameRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (nameRef.current) {
        nameRef.current.focus();
      }
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = event => {
    setTitle(event.target.value);
  };

  const handleCreateColumn = async () => {
    try {
      if (title) {
        dispatch(
          createKanbanList(
            boardId,
            {
              title: title
            },
            enqueueSnackbar
          )
        );
        // dispatch(createColumn({ title }));
        setTitle("");
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyUp = event => {
    if (event.key === "Enter") {
      handleCreateColumn();
    }
  };

  return (
    <Paper sx={{ minWidth: 280, width: 280 }}>
      {!open && (
        <Button
          fullWidth
          size='large'
          color='inherit'
          variant='outlined'
          startIcon={<Iconify icon={"eva:plus-fill"} width={20} height={20} />}
          onClick={handleOpen}
        >
          Add section
        </Button>
      )}

      {open && (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <OutlinedInput
            fullWidth
            placeholder='New section'
            inputRef={nameRef}
            value={title}
            onChange={handleChangeName}
            onKeyUp={handleKeyUp}
            sx={{ typography: "h6" }}
          />
        </ClickAwayListener>
      )}
    </Paper>
  );
}
