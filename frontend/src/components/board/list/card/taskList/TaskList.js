import React, { useState } from "react";
import { makeStyles, Typography, Button, TextField } from "@material-ui/core";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import AuthService from "../../../../../utils/service.js";

const useStyles = makeStyles((theme) => ({
    test: {
        "color": "blue"
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        padding: theme.spacing(1)
      },
}));

export default function TaskList(props) {

  const classes = useStyles();

  const [newTaskName, setNewTaskName] = useState("")

  const handleToggle = (task_id, status) => () => {

    AuthService.changeDoneStatus(task_id, !status).then((response) => {
        if (response) {
            props.createTaskList()
        } else {
          alert("Change status failed");
        }
      });
    
  };

  const deleteTask = (task_id) => () => {

    AuthService.deleteTask(task_id).then((response) => {
        if (response) {
            props.createTaskList()
        } else {
          alert("Delete task failed");
        }
      });

  };

  const addTask = (tasklist_id, newTaskName) => () => {
      
    AuthService.addTask(tasklist_id, newTaskName).then((response) => {
        if (response) {
            props.createTaskList()
        } else {
          alert("Add task failed");
        }
      });

  }

  return (
    <div>
      <br></br>
      <br></br>
        <Typography>{props.taskList.title}</Typography>

        <List component="nav" aria-label="secondary mailbox folders">

        {props.taskList.tasks && props.taskList.tasks.length > 0 ? (
            props.taskList.tasks.map((task) => (
                <div key={task.task_id}>
                    <Divider />
                    <ListItem button onClick={handleToggle(task.task_id, task.done)}>

                        <ListItemIcon>
                            <Checkbox
                                color="primary"
                                edge="start"
                                checked={task.done}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': task.task_id }}
                            />
                        </ListItemIcon>

                        <ListItemText id={task.task_id} primary={task.title} />

                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" button onClick={deleteTask(task.task_id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>

                    </ListItem>
                </div>
            ))
        ) : (
            <p></p>
        )}

        <Divider />

        <ListItem>
        <form className={classes.container} noValidate>
            <TextField
                id="taskName"
                label="Task name"
                type="text"
                onChange={(e) => setNewTaskName(e.target.value)}
                className={classes.textField}
            />
            <Button
                variant="contained"
                size="small"
                onClick={addTask(props.taskList.tasklist_id, newTaskName)}
                className={classes.button}
                style={{
                    marginLeft: "2vh",
                    fontWeight: "bold",
                }}
                startIcon={<AddIcon />}
            >
                Add task
            </Button>
        </form>
        </ListItem>
        
        </List>
    </div>
  );
}
