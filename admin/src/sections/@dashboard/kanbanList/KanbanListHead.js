import PropTypes from 'prop-types';
// @mui
import {TableRow, TableCell, TableHead } from '@mui/material';
import KanbanListToolbar from './KanbanListToolbar';
import KanbanMoreMenu from './KanbanMoreMenu';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

KanbanListHead.propTypes = {
  headLabel: PropTypes.array,
};

export default function KanbanListHead({
  headLabel,

}){

  return (
    <TableHead>
      <TableRow>
        
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
          >
            
              {headCell.label}
              
          
          </TableCell>
          
          
        ))}
        <TableCell align='right'>
        <KanbanMoreMenu/>
          </TableCell>

        
      </TableRow>
    </TableHead>
  );
}
