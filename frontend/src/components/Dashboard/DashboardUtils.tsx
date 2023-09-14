import {
  Alert,
  Button,
  DialogContentText,
  LinearProgress,
  TextField,
} from '@mui/material';
import AlertModal from '../common/AlertModal';
import { useFormik } from 'formik';
import { FormSpacer } from '../common/Utils';
import UseCreateNewBoard from '@/hooks/useCreateNewBoard';
import WithLoader from '../common/WithLoader/WithLoader';

interface CreateNewBoardProps {
  onClose: () => void;
  refetch: () => void;
}

export const CreateNewBoard = ({ onClose, refetch }: CreateNewBoardProps) => {
  const { isLoading, error, insertBoard, success } = UseCreateNewBoard();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: (values) => {
      insertBoard(values);
    },
  });

  console.log('success, err', success, error);

  if (success && !error) {
    onClose();
    refetch();
  }

  return (
    <AlertModal
      title="Create new Bankan Board"
      decline={{ text: 'Cancel', action: onClose }}
    >
      <DialogContentText>
        Please enter a name and description for your new board.
        {error && 'Error!'}
      </DialogContentText>
      <FormSpacer />
      {error && (
        <>
          <Alert severity="error">That didn't work... try again later.</Alert>{' '}
          <FormSpacer />
        </>
      )}
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Board Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <FormSpacer />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <FormSpacer />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      )}
    </AlertModal>
  );
};
