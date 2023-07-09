import dynamic from "next/dynamic";
import { connectDb } from "../helpers/db";

import Loading from "../components/ui/Loading";
const MeetupList = dynamic(() => import("../components/meetups/MeetupList"), {
  loading: () => <Loading />,
});

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  const client = await connectDb();
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
