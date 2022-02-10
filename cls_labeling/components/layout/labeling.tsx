import { AppBar, Box, Button, Drawer, Grid, IconButton, styled, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import LooksOne from '@mui/icons-material/LooksOne';
import LooksTwo from '@mui/icons-material/LooksTwo';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { getLabelItemState } from "context/ItemContext"

const drawerWidth = 240;

const ListContainer = styled(Grid, { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({theme, open}) => ({
    width: drawerWidth,
}))

const MainContainer = styled(Grid, { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({theme, open}) => ({
    height:'100vh',
    width:`calc(100% - ${drawerWidth}px)`,
    ...(open && {
      // transition: theme.transitions.create('width', {
      //   easing: theme.transitions.easing.easeOut,
      //   duration: theme.transitions.duration.enteringScreen,
      // }),
      width:'100vw',
    }),
}))

interface LabelingLayoutInterface {
    leftContent:any
    mainContent:any
    mainContent_name:string

    label1_func:any
    label2_func:any
}

const exportToJson = async () => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(await fetch('http://localhost:8000')
    .then((res) => res.json()))
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "data.json";

  link.click();
};

export default function LabelingLayout({leftContent, mainContent, mainContent_name, label1_func, label2_func} : LabelingLayoutInterface) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    open? setOpen(false): setOpen(true)
  };

  let item_state = getLabelItemState();

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {  
        if ((e.shiftKey) && e.code === 'KeyL') {
          console.log('tab switched')
          handleDrawerToggle()
        }
    })
  })
  return (
    <Grid
    container
    direction="row"
    justifyContent="flex-start"
    alignItems="stretch"
    spacing={0}
    sx={{
      margin: 0,
      height:"100%",
      overflow: "hidden"
    }}
    >
      <ListContainer hidden={open}>
        {leftContent}
      </ListContainer>
      <MainContainer open={open}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            {mainContent_name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={(event) => label1_func(event, item_state, 1)}
              color="inherit"
            >
              <LooksOne />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={(event) => label2_func(event, item_state, 2)}
              color="inherit"
            >
              <LooksTwo />
            </IconButton>
            <Button variant="contained" onClick={exportToJson}><CloudDownloadIcon/></Button>
        </Toolbar>
        {mainContent}
      </MainContainer>
    </Grid>
  );
}
