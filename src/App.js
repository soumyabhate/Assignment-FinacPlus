import React, { useState } from 'react';
import CommentModal from "./CommentModal"
import {Button} from "@material-ui/core"

export default function App() {
  const [open, setOpen] = useState(false);
  const people = ['Ethel Howard Daniel','John Doe','Johnson Daniel'];

  return (
    <div>
      <Button style={{'marginLeft': '40%','marginTop': '20%'}} variant="contained" color="primary" onClick={() => setOpen(true)}>
      Comment Modal
      </Button>
      <CommentModal open={open} onClose={() => setOpen(false)} people={people} />
    </div>
  );
}
