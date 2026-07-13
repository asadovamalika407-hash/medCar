import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CheckCircle as AttendanceIcon,
  Payment as PaymentIcon,
  BeachAccess as LeaveIcon,
  Description as DocumentIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import DashboardHome from '../components/DashboardHome';
import Employees from '../components/Employees';
import Attendance from '../components/Attendance';
import Salary from '../components/Salary';
import Leave from '../components/Leave';
import Documents from '../components/Documents';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, component: 'dashboard' },
  { text: 'Xodimlar', icon: <PeopleIcon />, component: 'employees' },
  { text: 'Davomat', icon: <AttendanceIcon />, component: 'attendance' },
  { text: 'Maosh', icon: <PaymentIcon />, component: 'salary' },
  { text: 'Ta\'til', icon: <LeaveIcon />, component: 'leave' },
  { text: 'Hujjatlar', icon: <DocumentIcon />, component: 'documents' },
];

export default function Dashboard({ user, onLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <DashboardHome />;
      case 'employees':
        return <Employees />;
      case 'attendance':
        return <Attendance />;
      case 'salary':
        return <Salary />;
      case 'leave':
        return <Leave />;
      case 'documents':
        return <Documents />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            MedCare HR System
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user.fullName}
          </Typography>
          <IconButton color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.component} disablePadding>
                <ListItemButton
                  selected={activeComponent === item.component}
                  onClick={() => {
                    setActiveComponent(item.component);
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          {renderComponent()}
        </Container>
      </Box>
    </Box>
  );
}
