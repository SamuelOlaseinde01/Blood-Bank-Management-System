import React from "react";
import { Error } from "@mui/icons-material";

function ErrorBoundaryFallback({ error }) {
  return (
    <div className="notfound-container">
        <div className="notfound">
            <Error style={{color: "red", fontSize: "6em",}}/>
            <h2>404 Route error</h2>
            <p>Looks like something is broken. It's not you, it's us.</p>
            <p>How about refreshing and see if it works</p>
            <button onClick={() => window.location.reload()}>Reload</button>
        </div>
    </div>
  );
}

export default ErrorBoundaryFallback;
