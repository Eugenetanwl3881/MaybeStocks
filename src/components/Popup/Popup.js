import React from "react";
import "./Popup.css";
import Button from "@mui/material/Button";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
        <Button
          variant="contained"
          onClick={() => props.setTrigger(false)}
          padding="20px"
          size="small"
          sx={{ p: 1, m: 1 }}
        >
          Close
        </Button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
