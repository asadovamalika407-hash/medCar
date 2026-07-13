import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

export default function Attendance() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Davomat Tizimi
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Xodimlar davomati va vaqt hisobi
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Davomat funksiyasi ishlab chiqilmoqda...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bu yerda kelish-ketish vaqti, kech qolganlar, kelmagan xodimlar
                ma'lumotlari bo'ladi.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
