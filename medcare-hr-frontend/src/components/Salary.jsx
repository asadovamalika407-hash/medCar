import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

export default function Salary() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Maosh Hisoblash
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Oylik maosh hisob-varaqlari
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Maosh moduli ishlab chiqilmoqda...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bu yerda oylik maosh hisoblash, davomatga asoslangan avtomatik hisoblash,
            qo'shimcha to'lovlar va bonus tizimi bo'ladi.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
