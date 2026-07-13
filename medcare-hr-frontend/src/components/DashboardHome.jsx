import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  People as PeopleIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';

const stats = [
  { title: 'Jami Xodimlar', value: '52', icon: <PeopleIcon />, color: '#1976d2' },
  { title: 'Bugun Keldi', value: '48', icon: <CheckIcon />, color: '#2e7d32' },
  { title: 'Bugun Kelmadi', value: '4', icon: <CancelIcon />, color: '#d32f2f' },
  { title: 'Ta\'tilda', value: '3', icon: <TrendingIcon />, color: '#ed6c02' },
];

const recentAttendance = [
  { id: 1, name: 'Aliyev Vali', position: 'Shifokor', time: '08:30', status: 'Keldi' },
  { id: 2, name: 'Rahimova Malika', position: 'Hamshira', time: '08:45', status: 'Kech qoldi' },
  { id: 3, name: 'Toshmatov Sardor', position: 'Laborant', time: '-', status: 'Kelmadi' },
  { id: 4, name: 'Hasanova Aziza', position: 'Shifokor', time: '08:15', status: 'Keldi' },
];

export default function DashboardHome() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Bugungi umumiy ko'rsatkichlar
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', background: stat.color, color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 2, fontSize: 40 }}>{stat.icon}</Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2">{stat.title}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Attendance */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Bugungi Davomat
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell><strong>Ism-Familiya</strong></TableCell>
                <TableCell><strong>Lavozim</strong></TableCell>
                <TableCell><strong>Vaqt</strong></TableCell>
                <TableCell><strong>Holat</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentAttendance.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color:
                          row.status === 'Keldi'
                            ? 'green'
                            : row.status === 'Kech qoldi'
                            ? 'orange'
                            : 'red',
                        fontWeight: 'bold',
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
