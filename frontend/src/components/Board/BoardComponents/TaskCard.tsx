import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import dayjs from 'dayjs';
import { MemberDropdown } from './MemberDropdown';

interface ITaskCardProp {
  item: Card;
  onEditCardSelect: (card: Card) => void;
}

export function TaskCard({ item, onEditCardSelect }: ITaskCardProp) {
  return (
    <>
      <Card className="m-1" sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            display="inline"
            sx={{ textDecoration: 'underline' }}
          >
            <div
              className={`${
                dayjs(new Date(item?.deadline)) <= dayjs(new Date())
                  ? 'text-red-500'
                  : ''
              }`}
            >
              {item?.deadline
                ? 'DEADLINE ' +
                  dayjs(new Date(item?.deadline)).format('D/MMM/YY, hh:ss A')
                : ''}
            </div>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <div>
            <MemberDropdown card={item} />
          </div>
        </CardContent>
        <CardActions className="flex flex-col">
          <Button
            className="justify-self-end"
            size="small"
            onClick={() => {
              onEditCardSelect(item);
            }}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
