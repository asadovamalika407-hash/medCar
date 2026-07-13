import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

export default function Documents() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Hujjatlar
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Xodimlar hujjatlari boshqaruvi
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Hujjatlar moduli ishlab chiqilmoqda...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bu yerda xodimlar uchun shartnoma, buyruq, pasport nusxasi va boshqa
            hujjatlarni yuklash, saqlash va yuklab olish imkoniyati bo'ladi.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
