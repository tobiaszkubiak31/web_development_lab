import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    test: {
        "color": "blue"
    }
}));

export default function TaskList(props) {

  const classes = useStyles();

  const handleToggle = (value) => () => {
    // zmiana done - true/false
    console.log("toogle " + value)
  };

  const deleteTask = (value) => () => {
    // zmiana done - true/false
    console.log("delete " + value)
  };

  return (
    <div>
      <br></br>
          <Typography>{props.taskList.title}</Typography>

          <List component="nav" aria-label="secondary mailbox folders">

            {props.taskList.tasks && props.taskList.tasks.length > 0 ? (
                props.taskList.tasks.map((task) => (
                    <div key={task.task_id}>
                        <Divider />
                        <ListItem button onClick={handleToggle(task.task_id)}>

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

          </List>
    </div>
  );
}
