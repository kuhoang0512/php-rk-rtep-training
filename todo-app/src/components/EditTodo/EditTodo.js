import React from "react";
import { Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});

const EditTodo = ({
  editTaskDataModal,
  onChangeEditTodoHandler,
  editTaskData,
  successTodoUpdatedMsg,
  toggleEditTaskModal,
  updateTodo
}) => {
  return (
    <div>
      <Dialog
        fullWidth
        open={editTaskDataModal}
        onClose={onChangeEditTodoHandler}
        modal={false}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>Todo List</DialogContentText>
          <div className="input-field-container">
            <ThemeProvider theme={theme}>
              <TextField
                autoFocus
                type="text"
                name="title"
                placeholder="Task Title"
                value={editTaskData.title}
                onChange={onChangeEditTodoHandler}
                className="task-title"
                color="primary"
                variant="outlined"
                style={{ width: "35%" }}
              />
              <TextField
                type="text"
                name="description"
                placeholder="Task description"
                value={editTaskData.description}
                onChange={onChangeEditTodoHandler}
                color="primary"
                variant="outlined"
                style={{ width: "60%" }}
              />
            </ThemeProvider>
          </div>
        </DialogContent>
        <div class="text-success p-4 mt-2">
          {successTodoUpdatedMsg}
        </div>
        <DialogActions>
          <Button onClick={toggleEditTaskModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={updateTodo}
            color="success"
            className="font-weight-bold add-task"
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditTodo;