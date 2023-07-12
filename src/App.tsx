import React from "react";
import "./App.css";
import SiteLayout from "./components/layout/SiteLayout";
import Table, { ColumnsType } from "antd/es/table";
import { IForecast } from "./models/IForecast";
import { useGetForecastQuery } from "./services/UserService";

const App = () => {
  const { data, isLoading, error } = useGetForecastQuery(5);

  const forecastWithKey = data?.map((forecast, index) => ({
    ...forecast,
    key: data[index],
  }));
  console.log(forecastWithKey);
  const columns: ColumnsType<IForecast> = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "TemperatureC",
      dataIndex: "temperatureC",
    },
    {
      title: "TemperatureF",
      dataIndex: "temperatureF",
    },
    {
      title: "Summary",
      dataIndex: "summary",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={forecastWithKey} />
    </div>
  );
};

export default App;
