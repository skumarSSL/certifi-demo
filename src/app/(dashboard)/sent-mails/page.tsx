import RootLayout from "@/app/layout";
import DashboardWrapper from "@/app/(dashboard)/layout";
import { connect } from "react-redux";

const SentMails = (props: any) => {
  return (
    <RootLayout>
      <p>Sent Mails</p>
    </RootLayout>
  );
};

export default SentMails;
