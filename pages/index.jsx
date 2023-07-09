import dynamic from "next/dynamic";
import { connectDb } from "../helpers/db";

import Loading from "../components/ui/Loading";
const MeetupList = dynamic(() => import("../components/meetups/MeetupList"), {
  loading: () => <Loading />,
});

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await connectDb();
  const db = client.db();

  const meetups = await db.collection("meetups").find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
