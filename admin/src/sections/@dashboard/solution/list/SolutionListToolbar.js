import PropTypes from "prop-types";
// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Toolbar, Tooltip, IconButton, Typography, InputAdornment } from "@mui/material";
// components
import Iconify from "../../../../components/Iconify";
import InputStyle from "../../../../components/InputStyle";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3)
}));

// ----------------------------------------------------------------------

SolutionListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterSolution: PropTypes.string,
  onFilterSolution: PropTypes.func,
  onDeleteSolutions: PropTypes.func
};

export default function SolutionListToolbar({
  numSelected,
  filterSolution,
  onFilterSolution,
  onDeleteSolutions
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? "primary.main" : "text.primary",
          bgcolor: isLight ? "primary.lighter" : "primary.dark"
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component='div' variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <InputStyle
          stretchStart={240}
          value={filterSolution}
          onChange={event => onFilterSolution(event.target.value)}
          placeholder='Search solution...'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Iconify
                  icon={"eva:search-fill"}
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            )
          }}
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton onClick={onDeleteSolutions}>
            <Iconify icon={"eva:trash-2-outline"} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <Iconify icon={"ic:round-filter-list"} />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
