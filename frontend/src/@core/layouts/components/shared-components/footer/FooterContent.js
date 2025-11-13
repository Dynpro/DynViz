// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'none' }}>
      <Typography sx={{ display: 'none' }}>
        {`© ${new Date().getFullYear()}`}
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'none' }}>
          <LinkStyled href=''>
            {/* Empty */}
          </LinkStyled>
          <LinkStyled href=''>
            {/* Empty */}
          </LinkStyled>
          <LinkStyled href=''>
            {/* Empty */}
          </LinkStyled>
          <LinkStyled href=''>
            {/* Empty */}
          </LinkStyled>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
