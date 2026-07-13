import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

export default function Leave() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Ta'til va Kasallik
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Ta'til va kasallik kunlari boshqaruvi
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ta'til moduli ishlab chiqilmoqda...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bu yerda ta'til so'rovlari, tasdiqlash, yillik ta'til balansi,
            kasallik varaqalari va kalendar ko'rinishi bo'ladi.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
