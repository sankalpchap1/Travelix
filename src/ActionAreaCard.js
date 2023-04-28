import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const GOOGLE_CUSTOM_SEARCH_API_KEY = 'AIzaSyCbWQhYUM';
const GOOGLE_CUSTOM_SEARCH_ENGINE_ID = 'a08ef28a98';

export const ActionAreaCard = ({business}) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
          params: {
            key: GOOGLE_CUSTOM_SEARCH_API_KEY,
            cx: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
            q: `${business.name} logo`,
            searchType: 'image',
            imgSize: 'large',
          },
        });
        const image = response.data.items[0].link;
        setImageUrl(image);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
  }, [business.name]);
  return (
    <Card sx={{ maxWidth: 345,"&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      } }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl || 'https://via.placeholder.com/140x140.png?text=No+Image'}
          alt={business.name}
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