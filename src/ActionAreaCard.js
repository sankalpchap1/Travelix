import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export const ActionAreaCard = ({business}) => {
  return (
    <Card sx={{ maxWidth: 345,"&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      } }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="travelix.png"
          alt="green iguana"
        />
        <CardContent sx={{maxHeight: 175}}>
          <Typography gutterBottom variant="h5" component="div">
            {business.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            City: {business.city} <br/>
            Rating: {business.stars}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}