"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DatabaseStats } from "@/types/databaseStatus";
import { FetchError } from "@/types/fetchErr";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface CollectionsChartsProps {
  data: DatabaseStats | null;
  error: FetchError | null;
}

const CollectionsCharts: React.FC<CollectionsChartsProps> = ({
  data,
  error,
}) => {
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
        {error.details && (
          <span className="block text-sm mt-1">{error.details}</span>
        )}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" />
        <p className="ml-3 text-gray-500">Loading database status...</p>
      </div>
    );
  }

  // Calculate total documents
  const totalDocuments = data.collections.reduce(
    (sum, col) => sum + col.document_count,
    0
  );

  // Generate chart data from all collections
  const chartData = {
    labels: data.collections.map((col) => col.name),
    datasets: [
      {
        data: data.collections.map((col) => col.document_count),
        backgroundColor: data.collections.map(
          (_, index) =>
            `hsl(${(index * 360) / data.collections.length}, 70%, 60%)` // Generate dynamic colors
        ),
        hoverBackgroundColor: data.collections.map(
          (_, index) =>
            `hsl(${(index * 360) / data.collections.length}, 80%, 50%)` // Highlight color
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Remove the legend
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw as number;
            const percentage = ((value / totalDocuments) * 100).toFixed(2);
            return `${
              tooltipItem.label
            }: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "50%", // Create the central cutout for doughnut
  };

  return (
    <div className="happy-card w-1/2 p-0">
      <h2 className="text-xl font-semibold text-center my-3">
        Collection Distribution
      </h2>
      <div className=" h-[2px] bg-base-100 w-full" />
      <div className=" mt-4 p-6">
        <div className="flex justify-center items-center relative">
          <div className="w-full max-w-lg">
            <Doughnut
              data={chartData}
              options={chartOptions}
              className="size-96"
              style={{ height: "16rem", width: "16rem" }}
            />
          </div>
          <div className="absolute text-center">
            <h3 className="text-xl font-bold text-gray-700">Total Documents</h3>
            <p className="text-lg text-gray-500">
              {totalDocuments.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {data.collections.map((collection, index) => (
            <div
              key={index}
              className="bg-base-100 p-4 rounded-lg shadow-sm flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-700">
                  {collection.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Documents: {collection.document_count.toLocaleString()}
                </p>
              </div>
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: `hsl(${
                    (index * 360) / data.collections.length
                  }, 70%, 60%)`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsCharts;
