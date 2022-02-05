import { Drawer, Grid, styled } from '@mui/material';
import * as React from 'react';

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
}

export default function LabelingLayout({leftContent, mainContent, mainContent_name} : LabelingLayoutInterface) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    open? setOpen(false): setOpen(true)
  };

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {  
        e.preventDefault();
        if ((e.shiftKey) && e.code === 'KeyL') {
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
        {mainContent}
      </MainContainer>
    </Grid>
  );
}
