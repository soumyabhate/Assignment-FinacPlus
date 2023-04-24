import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import {
  Add as AddIcon,
  Close as CloseIcon,
  Person as PersonIcon,
} from '@material-ui/icons';
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
  ListSubheader
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'auto'
  },
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
  commentInput: {
    width: '100%',
    border:'1px solid grey',
    borderRadius:'10px'
  },
  tagContainer:{width:'100%', border: '1px solid grey',borderRadius: '10px',marginTop: '11px'},
  loanContainer:{marginLeft:'auto',background:'lightblue',borderRadius:'10px',padding:'10px'}
}));

const CommentModal=(props)=> {
  const classes = useStyles();
  const { open, onClose, people } = props;
  const [commentText, setCommentText] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9',
      );
      const newArray=result.data.comments.map((commentt)=>{
        const options = { year: "numeric", month: "long", day: "numeric",hour: 'numeric', hour12: true}
        const date= new Date(commentt.updatedOn).toLocaleDateString(undefined, options)
        const newComment = {
          id: comments.length + 1,
          loanId: 123456,
          comment:commentt.comment,
          date:  date,
          people:commentt.taggedTo,
          user:commentt.updatedBy
        };
        return newComment;
      })
      setComments(...comments,newArray)
    };
    fetchData();
  }, []);

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handlePersonSelect = (event) => {
    setSelectedPeople(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const options = { year: "numeric", month: "long", day: "numeric",hour: 'numeric', hour12: true}
    const date= new Date().toLocaleDateString(undefined, options)
    const newComment = {
      id: comments.length + 1,
      loanId: 123456,
      comment: commentText,
      date: date,
      people: selectedPeople,
    };
    console.log(newComment)
    setComments([...comments, newComment]);
    setCommentText('');
    setSelectedPeople([]);
  }

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Paper className={classes.paper}>
        <div style={{display:'flex'}}>
        <h2>Comments ({comments.length})</h2>
        <h5 className={classes.loanContainer} >LOAN ID- 111711182</h5>
        </div>
        <List>
          {comments.map((comment, index) => (
            <>
            <InitialsAvatar name={`${comment.user}`} />
            <ListItem key={index}>
              <ListItemText
                primary={comment.comment}
                secondary={
                  <>
                  <>
                  Tagged:
                  {comment.people?.map((person, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && ', '}
                      {person}&nbsp;
                    </React.Fragment>
                  ))}
                 </>
                 <>
                 <br></br>
                  Date:
                    <React.Fragment key={index}>
                      {index > 0 && ', '}
                      {comment.date}
                    </React.Fragment>
                 </>
                </>
                }
              />
              
            </ListItem>
            </>
          ))}
        </List>
        <FormControl className={classes.commentInput}>
          <InputLabel style={{marginLeft:'4px'}} htmlFor="comment-input">Add a comment</InputLabel>
          <Input
            style={{padding:'34px'}}
            id="comment-input"
            value={commentText}
            onChange={handleCommentTextChange}
            endAdornment={
            <InputAdornment position="end">
            <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleSubmit}
                        >
            <AddIcon />
            </IconButton>
            </InputAdornment>
            }
            />
        </FormControl>
            <FormControl className={classes.tagContainer}>
              <InputLabel style={{marginLeft:'10px',marginTop:'-4px'}} id="people-select-label">Tag people</InputLabel>
              <Select
              labelId="people-select-label"
              id="people-select"
              multiple
              value={selectedPeople}
              onChange={handlePersonSelect}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              >
              <ListSubheader>Select people</ListSubheader>
              {people.map((person,id) => (
              <MenuItem key={id} value={person}>
                <Checkbox checked={selectedPeople.indexOf(person) > -1} />
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={person} />
              </MenuItem>
              ))}
              </Select>
            </FormControl>
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
      </Paper>
    </Modal>)
  }
  export default CommentModal;