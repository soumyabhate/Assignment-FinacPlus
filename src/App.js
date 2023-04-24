import React, { useState } from 'react';
import CommentModal from "./CommentModal"
import {Button} from "@material-ui/core"

export default function App() {
  const [open, setOpen] = useState(false);
  const people = ['Ethel Howard Daniel','John Doe','Johnson Daniel'];

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
      Open Comment Modal
      </Button>
      <CommentModal open={open} onClose={() => setOpen(false)} people={people} />
    </div>
  );
}
