import connectDb from "../../../db/connectDb";
import User from "../../../model/User";
import { notFound } from "next/navigation";
import PaymentPage from "../components/PaymentPage";

const Username = async ({ params }) => {
  const { username } = await params;

  const checkUser = async () => {
    await connectDb();

    const u = await User.findOne({
      username: username,
    });

    if (!u) {
      return notFound();
    }

    return u;
  };

  await checkUser();

  return (
    <PaymentPage username={username} />
  );
};

export async function generateMetadata({ params }) {
  const { username } = await params;

  return {
    title: `Support ${username} - Get Me A Chai`,
  };
}

export default Username;