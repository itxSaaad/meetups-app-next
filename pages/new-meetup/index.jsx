import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

import Loading from "../../components/ui/Loading";
const NewMeetupForm = dynamic(
  () => import("../../components/meetups/NewMeetupForm"),
  {
    loading: () => <Loading />,
  }
);

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    // console.log(data);

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add New Meetup! | React Meetups</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetupPage;
