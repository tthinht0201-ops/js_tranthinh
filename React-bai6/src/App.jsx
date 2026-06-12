import { Box, Grid } from '@mui/material'
import './App.css'

function App() {
  return (
    <>
      <Grid container maxWidth="lg" >
        <Grid
          size={{
            xs: 6,
            md: 6,
            lg: 4,
          }}
        >
          <Box
            sx={{
              width: '100%',
              bgcolor: 'red',
              height: 100,
            }}
          >
            <Grid container>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                Item 1
              </Grid>
              {/*  <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                Product 2
              </Grid> */}
            </Grid>
          </Box>
        </Grid>
        <Grid
          size={{
            xs: 6,
            md: 6,
            lg: 4,
          }}
        >
          <Box
            sx={{
              width: '100%',
              bgcolor: 'blue',
              height: 100,
            }}
          >
            Item 2
          </Box>
        </Grid>

        <Grid
          size={{
            xs: 6,
            md: 6,
            lg: 4,
          }}
        >
          <Box
            sx={{
              width: '100%',
              bgcolor: 'green',
              height: 100,
            }}
          >
            Item 3
          </Box>
        </Grid>
        <Grid
          size={{
            xs: 6,
            md: 6,
            lg: 4,
          }}
        >
          <Box
            sx={{
              width: '100%',
              bgcolor: 'orange',
              height: 100,
            }}
          >
            Item 4
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default App