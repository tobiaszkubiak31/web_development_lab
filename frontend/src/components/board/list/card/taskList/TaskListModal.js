import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthService from "../../../../../utils/service.js";
import { Button, makeStyles, TextField } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import TaskList from "./TaskList"

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
      padding: theme.spacing(1)
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

export default function TaskListModal(props) {

  const classes = useStyles();

  const [newListName, setNewListName] = useState("");

  const [taskLists, setTaskLists] = useState([]);

  const handleClose = () => {
    props.hideModal();
  };

  let createTaskList = () => {
    if(newListName !== "") {
      AuthService.addTaskList(newListName, props.card_id).then((response) => {
        if (response) {
          setNewListName("")
          getTaskList()
        } else {
          alert("Add taskList failed");
        }
      });
    }
  }

  let getTaskList = () => {
    AuthService.getTaskList(props.card_id).then((response) => {
      if (response) {
        let newData = Array.of(response.data)
        setTaskLists(newData[0])
      } else {
        alert("Get taskList failed");
      }
    });
  }

  useEffect(() => {
    AuthService.getTaskList(props.card_id).then((response) => {
      if (response) {

        let newData = Array.of(response.data)
        setTaskLists(newData[0])

      } else {
        alert("Get taskList failed");
      }
    });
  }, []);

  return (
    <div>
      <Dialog
        open={props.isDisplayed}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Task list</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create list, please enter name.
          </DialogContentText>
          <form className={classes.container} noValidate>
            <TextField
              id="listName"
              label="Tasklist name"
              type="text"
              onChange={(e) => setNewListName(e.target.value)}
              className={classes.textField}
            />
            <Button
              variant="contained"
              size="small"
              onClick={createTaskList}
              className={classes.button}
              style={{
                marginLeft: "2vh",
                fontWeight: "bold",
              }}
              startIcon={<AddIcon />}
            >
              Add list
            </Button>
          </form>

          {taskLists && taskLists.length > 0 ? (
            taskLists.map((taskList) => (
              <TaskList key={taskList.tasklist_id} taskList={taskList} getTaskList={getTaskList} card_id={props.card_id}/>
            ))
          ) : (
            <p></p>
          )}

        </DialogContent>
      </Dialog>
    </div>
  );
}
