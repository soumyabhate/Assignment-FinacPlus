import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  Modal,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListSubheader,
  Button,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Close as CloseIcon,
  Person as PersonIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  commentInput: {
    width: '100%',
  },
}));

const commentData = [
  {
    id: 1,
    loanId: 123456,
    user: 'Ethel Howard Daniel',
    comment: 'This is a test comment',
    date: '2022-01-01T12:00:00.000Z',
    people: ['John Doe'],
  },
  {
    id: 2,
    loanId: 123456,
    user: 'John Doe',
    comment: 'This is another test comment',
    date: '2022-01-03T12:00:00.000Z',
    people: ['Ethel Howard Daniel'],
  },
];

function CommentModal() {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [people, setPeople] = useState([]);
  const [formState, setFormState] = useState({
    user: '',
    comment: '',
    people: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9',
      );
      setComments(result.data.comments);
      setPeople(result.data.people);
    };
    fetchData();
  }, []);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  function handlePeopleChange(event) {
    setFormState({
      ...formState,
      people: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newComment = {
      id: comments.length + 1,
      loanId: 123456,
      user: formState.user,
      comment: formState.comment,
      date: new Date().toISOString(),
      people: formState.people,
    };
    setComments([...comments, newComment]);
    setFormState({
      user: '',
      comment: '',
      people: [],
    });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toDateString()}`
  }
  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Paper className={classes.paper}>
        <h2>Comments ({comments.length})</h2>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={comment.text}
                secondary={
                  <>
                    Tagged:
                    {comment.people.map((person, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && ', '}
                        {person.name}
                      </React.Fragment>
                    ))}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        </Paper>
        </Modal>
  )

}
