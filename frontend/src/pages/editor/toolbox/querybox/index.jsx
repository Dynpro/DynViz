import { useRef, useState, Fragment } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'

import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import IconButton from '@mui/material/IconButton'
import Popper from '@mui/material/Popper'
import Grow from '@mui/material/Grow'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'

import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

const RunQueryBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,

  padding: theme.spacing(1)
  // textAlign: 'center'

  //   color: theme.palette.text.secondary
}))

function Item(props) {
  const { sx, ...other } = props
  return (
    <Box
      sx={{
        // p: 1,
        // m: 1,
        // bgcolor: theme => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        // color: theme => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        // border: '1px solid',
        // borderColor: theme => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        // borderRadius: 2,
        // fontSize: '0.875rem',
        // fontWeight: '700',
        ...sx
      }}
      {...other}
    />
  )
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object
  ])
}

const options = ['Snowflake', 'PostgreSQL', 'MySQL']

const QueryEditor = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(1)

  // ** Ref
  const anchorRef = useRef(null)

  const handleClick = () => {
    // console.info(You clicked '{options[selectedIndex]}')
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <RunQueryBox elevation={0} sx={{ paddingX: 4 }}>
        <TextField
          // rows={3}
          minRows={3}
          maxRows={10}
          multiline
          fullWidth
          type='code'
          label='SQL #CL10934'
          //   defaultValue='Default Value'
          id='textarea-outlined-static'
        />
        <Box sx={{ display: 'flex', paddingY: 2, borderRadius: 1 }}>
          <Item sx={{ flexGrow: 1, paddingY: 1 }}>
            {/* {' '} */}
            {/* <TextField label='Comments' id='size-small' defaultValue='' size='small' /> */}
            <Button variant='outlined' size='small' startIcon={<Icon icon='bx:plus' />}>
              Add
            </Button>
            <Button
              variant='outlined'
              sx={{ marginX: 2 }}
              color='error'
              size='small'
              startIcon={<Icon icon='ic:delete' />}
            >
              Delete
            </Button>
          </Item>
          <Item>
            <Fragment>
              <ButtonGroup
                variant='outlined'
                sx={{ paddingX: 2 }}
                color='secondary'
                size='small'
                ref={anchorRef}
                aria-label='split button'
              >
                <Button
                  startIcon={<Icon icon='ic:baseline-brightness-1' style={{ color: 'lightgreen' }} />}
                  onClick={handleClick}
                >
                  {options[selectedIndex]}
                </Button>
                <Button
                  size='small'
                  aria-haspopup='menu'
                  onClick={handleToggle}
                  sx={{ px: '0 !important' }}
                  aria-label='select merge strategy'
                  aria-expanded={open ? 'true' : undefined}
                  aria-controls={open ? 'split-button-menu' : undefined}
                >
                  <Icon fontSize={12} icon='bxs:down-arrow' />
                </Button>
              </ButtonGroup>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                sx={{ zIndex: 100 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id='split-button-menu'>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              disabled={index === 2}
                              selected={index === selectedIndex}
                              onClick={event => handleMenuItemClick(event, index)}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Fragment>
          </Item>
          <Item>
            <Button variant='tonal' size='small' endIcon={<Icon icon='bx:send' />}>
              Run
            </Button>
          </Item>
          <Item>
            <Button variant='tonal' size='small'>
              Apply
            </Button>
            {/* <FormControl fullWidth sx={{ mb: 2 }} size='small'>
              <InputLabel htmlFor='auth-login-v2-password'>Apply</InputLabel>

              <OutlinedInput
                value={'CL18792391'}
                onBlur={'onBlur'}
                label='Password'
                onChange={'onChange'}
                id='auth-login-v2-password'
                type='text'
                disabled
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton edge='end' onMouseDown={e => e.preventDefault()}>
                      <Icon fontSize={20} icon='bx:plus' />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl> */}
          </Item>
        </Box>
      </RunQueryBox>
    </>
  )
}

export default QueryEditor
