import CollectionsCharts from "@/components/site/database/collections_cards";
import DatabaseHeader from "@/components/site/database/databaseHeader";
import { fetchDatabaseStatus } from "@/services/databaseStatusService";
import { DatabaseStats } from "@/types/databaseStatus";
import { FetchError } from "@/types/fetchErr";

const Home = async () => {
  let data: DatabaseStats | null = null;
  let error: FetchError | null = null;

  try {
    const result = await fetchDatabaseStatus();

    if (result && "message" in result) {
      error = result;
    } else if (result) {
      data = result;
    }
  } catch (err) {
    error = {
      message: "An unexpected error occurred",
      details: (err as Error).message,
    };
  }

  return (
    <div className="happy-page">
      <h1 className="happy-title-head">Collections</h1>
      <DatabaseHeader data={data} error={error}/>
      <div>
        <CollectionsCharts data={data} error={error} />
      </div>
      <div className=" h-screen" />
    </div>
  );
};

export default Home;
