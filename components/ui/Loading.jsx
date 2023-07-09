import { FaRegHandshake } from "react-icons/fa";

import classes from "./Loading.module.css";

function Loading() {
  return (
    <div className={classes.container}>
      <div className={classes.loader}>
        <FaRegHandshake className={classes.icon} />
      </div>
      <p>Loading</p>
    </div>
  );
}

export default Loading;
