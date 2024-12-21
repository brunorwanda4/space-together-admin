import CollectionsCharts from "@/components/site/collections/collections_charts";
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
      <div>
        <CollectionsCharts data={data} error={error} />
      </div>
    </div>
  );
};

export default Home;
