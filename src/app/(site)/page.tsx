import PageTitle from "@/components/my-components/page-title";
import CollectionInDatabase from "@/components/site/dashboard/collections/collection-in-database";
import HeroDashboard from "@/components/site/dashboard/hero-dashboard";
import RequestAndMessagesDashboard from "@/components/site/dashboard/requests/request-and-messages";

const Dashboard = () => {
  return (
    <div className=" happy-page">
     <PageTitle title="Dashboard"/>
      <div className=" happy-line gap-4">
        <HeroDashboard />
        <CollectionInDatabase />
      </div>
      {/* errors and request */}
      <div>
        <RequestAndMessagesDashboard />
      </div>
      <div className=" h-screen "></div>
    </div>
  );
};

export default Dashboard;
