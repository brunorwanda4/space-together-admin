import CollectionInDatabase from "@/components/site/dashboard/collections/collection-in-database"
import HeroDashboard from "@/components/site/dashboard/hero-dashboard"
import RequestAndMessagesDashboard from "@/components/site/dashboard/requests/request-and-messages"

const page = () => {
  return (
    <div  className=" min-h-screen p-2 flex flex-col space-y-2 happy-line ">
      <div className=" happy-line gap-4">
        <HeroDashboard />
        <CollectionInDatabase />
      </div>
      {/* errors and request */}
      <div>
        <RequestAndMessagesDashboard />
      </div>
      <div className=" h-screen ">

      </div>
    </div>
  )
}

export default page
