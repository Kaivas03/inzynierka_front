import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  deleteAction: () => void;
};

export default function DeleteConfirm(props: Props) {
  const onDelete = () => {
    props.deleteAction();
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogContent>Czy na pewno chcesz usunąć?</DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={onDelete}>Usuń</Button>
      </DialogActions>
    </Dialog>
  );
}
