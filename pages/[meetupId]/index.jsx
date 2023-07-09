import { ObjectId } from "mongodb";
import dynamic from "next/dynamic";
import { connectDb } from "../../helpers/db";

import Loading from "../../components/ui/Loading";
const MeetupDetail = dynamic(
  () => import("../../components/meetups/MeetupDetail"),
  {
    loading: () => <Loading />,
  }
);

function MeetupDetailPage(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await connectDb();
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // fetch data for a single meetup
  const client = await connectDb();
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const objectId = new ObjectId(meetupId);

  const selectedMeetup = await meetupsCollection.findOne({
    _id: objectId,
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailPage;
