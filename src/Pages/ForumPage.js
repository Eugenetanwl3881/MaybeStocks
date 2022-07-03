import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAuth } from "../hooks/useAuth";

function ForumPage() {

    const { user } = useAuth();

    // const [watchlist, setWatchlistState] = useState({});
  
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-textarea"
            label="Enter your message here"
            multiline
          />
        </div>
      </Box>
    );
}


export default ForumPage;