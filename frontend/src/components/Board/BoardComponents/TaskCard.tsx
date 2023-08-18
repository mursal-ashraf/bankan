import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

interface ITaskCardProp {
  item: ICard;
  onEditCardSelect: (card: ICard) => void;
}

export function TaskCard({ item, onEditCardSelect }: ITaskCardProp) {
  const onEditCardClick = () => {
    onEditCardSelect(item);
  };
  return (
    <>
      <Card className="m-1" sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions className="flex flex-col">
          <Button
            className="justify-self-end"
            size="small"
            onClick={onEditCardClick}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
