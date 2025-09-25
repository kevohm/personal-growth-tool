import EarningsChart from "./components/EarningsChart";
import Widget from "./components/Widget";

const Dashboard = () => {
  return (
    <div className="h-auto  w-full flex flex-col gap-6  px-6 pb-6 bg-red">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Widget title="Total Expenses" amount={9845.2} change={-2.1} />
        <Widget title="Total Savings" amount={18420.75} change={4.5} />
        <Widget title="Total Earnings" amount={84849.93} change={6.2} />
      </div>
      <EarningsChart />
    </div>
  );
};

export default Dashboard;
