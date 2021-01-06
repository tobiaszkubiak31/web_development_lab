import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
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

  const [taskLists, setTaskLists] = useState([{
        tasklist_id: 1,
        title: "Lista 1",
        tasks: [
            {
              task_id: 1,
              title: "Zrob pranie",
              done: true
            },
            {
              task_id: 2,
              title: "Pozmywaj",
              done: false
          }
        ]
    },
      {
        tasklist_id: 2,
        title: "Kolejna lista",
        tasks: [
            {
              task_id: 3,
              title: "Telewizja",
              done: false
            },
            {
              task_id: 4,
              title: "Zakupy trzeba zrobic tak szybko jak to możliwe, zrozumiano? Aleluja i do przodu tak mówił mój z Radomia wuj. Lepa na ucho, kołowrotek i nie ma typa.",
              done: false
          }
        ]
    },
    {
      tasklist_id: 3,
      title: "Kolejna lista2",
      tasks: [
          {
            task_id: 5,
            title: "Telewizja2",
            done: false
          },
          {
            task_id: 6,
            title: "Zakupy 123 trzeba zrobic tak szybko jak to możliwe, zrozumiano? Aleluja i do przodu tak mówił mój z Radomia wuj. Lepa na ucho, kołowrotek i nie ma typa.",
            done: false
        }
      ]
    }]);

  const handleClose = () => {
    props.hideModal();
  };

  let createTaskList = () => {
    if(newListName !== "") {
      AuthService.addTaskList(newListName, props.card_id).then((response) => {
        if (response) {
          setTaskLists(response)
          setNewListName("")
        } else {
          alert("Add taskList failed");
        }
      });
    }
    
  }

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
              <TaskList key={taskList.tasklist_id} taskList={taskList} createTaskList={createTaskList}/>
            ))
          ) : (
            <p></p>
          )}

        </DialogContent>
      </Dialog>
    </div>
  );
}
