import CollectionInDatabase from "@/components/site/dashboard/collections/collection-in-database"
import HeroDashboard from "@/components/site/dashboard/hero-dashboard"

const page = () => {
  return (
    <div  className=" min-h-screen p-2 flex flex-col space-y-2">
      <div >
        <HeroDashboard />
      </div>
      <div>
        <CollectionInDatabase />
      </div>
      <div className=" h-screen">

      </div>
    </div>
  )
}

export default page
