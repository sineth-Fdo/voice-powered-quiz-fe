import { AreaChartOverview } from "@/components/src/dashboard-conponents/charts/AreaChartOverview";

const page = () => {
  return (
    <div>
      <div className="border border-3 border-SECONDARY w-[100%] h-70 p-3 rounded-lg">
        <AreaChartOverview />
      </div>
    </div>
  );
};

export default page;
