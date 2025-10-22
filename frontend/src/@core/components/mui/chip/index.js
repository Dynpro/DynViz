// ** MUI Imports
import MuiChip from '@mui/material/Chip';

// ** Third Party Imports
import clsx from 'clsx';

// ** Hooks Imports
import useBgColor from 'src/@core/hooks/useBgColor';

const Chip = ({ sx, skin = 'filled', color = 'default', rounded = false, ...rest }) => {
  // ** Hook
  const bgColors = useBgColor();

  const colors = {
    primary: bgColors.primaryLight,
    secondary: bgColors.secondaryLight,
    success: bgColors.successLight,
    error: bgColors.errorLight,
    warning: bgColors.warningLight,
    info: bgColors.infoLight,
  };

  // Dynamically generate styles based on the skin and color props
  const chipStyles = skin === 'light' && color ? { ...colors[color], ...sx } : sx;

  return (
    <MuiChip
      {...rest}
      variant={skin === 'light' ? 'filled' : skin} // Dynamically set variant based on the skin prop
      className={clsx({
        'MuiChip-rounded': rounded,
        'MuiChip-light': skin === 'light',
      })}
      sx={chipStyles}
    />
  );
};

export default Chip;
