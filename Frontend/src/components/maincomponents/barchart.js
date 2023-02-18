import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";
export default class Barchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    this.getData();
  }
  getData = (fromDate = "", toDate = "") => {
    fetch("sampleDataForBarchart.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.items });
      });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="BarChart">
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis dataKey="count" />
            <Tooltip />
            <Bar type="monotone" dataKey="count" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
