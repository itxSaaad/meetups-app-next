import Link from "next/link";

import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <>
      <div className={classes.action}>
        <Link href="/">Go Back</Link>
      </div>

      <section className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </>
  );
}

export default MeetupDetail;
