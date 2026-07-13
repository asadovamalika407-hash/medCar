import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const employees = [
  {
    id: 1,
    name: 'Dr. Karimov Javohir',
    position: 'Kardiolog',
    department: 'Kardiologiya',
    phone: '+998 90 111 22 33',
    startDate: '2020-01-15',
    status: 'Faol',
  },
  {
    id: 2,
    name: 'Dr. Shukurova Dilnoza',
    position: 'Nevrolog',
    department: 'Nevrologiya',
    phone: '+998 91 222 33 44',
    startDate: '2021-03-20',
    status: 'Faol',
  },
  {
    id: 3,
    name: 'Rahimova Malika',
    position: 'Hamshira',
    department: 'Terapiya',
    phone: '+998 93 333 44 55',
    startDate: '2022-05-10',
    status: 'Faol',
  },
];

export default function Employees() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Xodimlar Ro'yxati
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Barcha xodimlar profillari
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Yangi Xodim
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell><strong>Ism-Familiya</strong></TableCell>
              <TableCell><strong>Lavozim</strong></TableCell>
              <TableCell><strong>Bo'lim</strong></TableCell>
              <TableCell><strong>Telefon</strong></TableCell>
              <TableCell><strong>Ish Boshlagan</strong></TableCell>
              <TableCell><strong>Holat</strong></TableCell>
              <TableCell align="center"><strong>Amallar</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.phone}</TableCell>
                <TableCell>{emp.startDate}</TableCell>
                <TableCell>
                  <Chip
                    label={emp.status}
                    color="success"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
