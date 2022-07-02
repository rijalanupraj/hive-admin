import PropTypes from "prop-types";
// @mui
import { TableRow, TableCell, TableHead } from "@mui/material";
import KanbanListToolbar from "./KanbanListToolbar";
import KanbanMoreMenu from "./KanbanMoreMenu";

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
};

KanbanListHead.propTypes = {
  headLabel: PropTypes.array
};

export default function KanbanListHead({ headLabel, board, onEdit, onDelete }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell key={board._id} align={"left"}>
          {board.title}
        </TableCell>
        <TableCell align='right'>
          <KanbanMoreMenu onEdit={onEdit} onDelete={onDelete} />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
