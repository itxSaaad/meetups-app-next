import dynamic from "next/dynamic";
import Head from "next/head";
import { connectDb } from "../helpers/db";

import Loading from "../components/ui/Loading";
const MeetupList = dynamic(() => import("../components/meetups/MeetupList"), {
  loading: () => <Loading />,
});

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups | Find your next meetup!</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
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
    revalidate: 1,
  };
}

export default HomePage;
