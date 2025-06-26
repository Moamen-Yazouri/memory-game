import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';

// interface IProps extends ICardGame {};

const GameCard = () => {
    const theme = useTheme();
    const gradient = theme.palette.mode === "light" ?
      "linear-gradient(135deg,rgb(204, 188, 222) 0%,rgb(186, 171, 192) 100%)"
      : "linear-gradient(135deg, #230739 0%, #3d1561 50%, #5c3a8d 100%)" 

    return (
        <Card sx={{
            width: "fit-content"
        }}>
        <CardActionArea>
          <CardContent
            sx={{
              width: 100,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: gradient,
            }}
          >
            {/* Add some visible content here */}
          </CardContent>
        </CardActionArea>
      </Card>
    )
}

export default GameCard;