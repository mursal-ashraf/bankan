import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

interface ITaskCardProp {
  item: ICard
}

export function TaskCard({ item }: ITaskCardProp) {
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
          <Button className="justify-self-end" size="small">
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}