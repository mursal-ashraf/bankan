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
import { useTypedSupabaseMutation } from '@/hooks/utils';
import { useUser } from '@/hooks';

interface CreateNewBoardProps {
  onClose: () => void;
  refetch: () => void;
}

export const CreateNewBoard = ({ onClose, refetch }: CreateNewBoardProps) => {
  const user = useUser();
  const user_id = user?.id as string;

  const { mutate, isLoading, isError, isSuccess } = useTypedSupabaseMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: (values) => {
      mutate((supabase) =>
        supabase.from('board').insert([{ ...values, user_id }]),
      );
    },
  });

  if (isSuccess) {
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
      </DialogContentText>
      <FormSpacer />
      {isError ? (
        <>
          <Alert severity="error">That didn't work... try again later.</Alert>
          <FormSpacer />
        </>
      ) : (
        <></>
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
