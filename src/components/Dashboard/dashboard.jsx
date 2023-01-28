import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import './dashboard.css'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}


const columns = [
  {
    field: 'name',
    headerName: 'Team Name',
    flex: 1,
    editable: true,
    headerClassName: 'headerStyle',
  },
  {
    field: 'city',
    headerName: 'City',
    flex: 1,
    editable: true,
    headerClassName: 'headerStyle',
  },
  {
    field: 'abbreviation',
    headerName: 'Abbreviation',
    flex: 1,
    editable: true,
    headerClassName: 'headerStyle',
  },
  {
    field: 'conference',
    headerName: 'Conference',
    flex: 1,
    editable: true,
    headerClassName: 'headerStyle',
  },
  {
    field: 'division',
    headerName: 'Division',
    flex: 1,
    editable: false,
    headerClassName: 'headerStyle',
  }
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [inner, setInner] = useState()
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  let toggleSidebar = function (data) {
    if (open) {
      handleDrawerClose()
    } else {
      handleDrawerOpen()
      let arr = Object.values(data.row)
      arr.shift()
      setInner(arr);
    }
  }


  useEffect(() => {
    fetch('https://www.balldontlie.io/api/v1/teams')
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setData();
      });
  }, []);
  return loading ? (
    <span class="loader"></span>
  ) : error ? (
    "Error!"
  ) : (
    <div>
      <div className='heading'>NBA TEAMS</div>
      <Box sx={{
        height: 600, width: '80%', '& .headerStyle': {
          backgroundColor: '#244b92', color: '#fff'
        }
      }}>
        <DataGrid
          rows={data}
          columns={columns}
          onRowClick={(params) => toggleSidebar(params)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={data.id}
          disableSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: QuickSearchToolbar }}
        />
        <Drawer
          sx={{
            width: 500,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 500,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <IconButton classes='buttonStyle' onClick={handleDrawerClose}>
            {inner && inner[5]}
            <div className='right'>
              <CloseIcon />
            </div>
          </IconButton>
          <Divider />
          <List>
            {inner && inner.map((text, index) => (
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
}