import { useRouter } from "next/router";
import dynamic from "next/dynamic";

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

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
