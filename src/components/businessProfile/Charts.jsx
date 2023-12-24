import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomAreaChart = ({
  data,
  xKey,
  yKey,
  label,
  unit = null,
  toolTipFormatter = (value, name, props) => parseFloat(value).toFixed(2),
}) => (
  <AreaChart
    data={data}
    width={1000}
    height={500}
    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
  >
    <defs>
      <linearGradient id="area-fill" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="40%" stopColor="#DD6969" />
        <stop offset="70%" stopColor="#DD696933" />
        <stop offset="100%" stopColor="#FFFFFF00" />
      </linearGradient>
    </defs>
    <XAxis dataKey={xKey} />
    <YAxis label={{ value: label, angle: -90, position: "left" }} unit={unit} />
    <Area dataKey={yKey} stroke="#DD6969" fill="url(#area-fill)" />
    <Tooltip formatter={toolTipFormatter} />
  </AreaChart>
);

const CustomBarChart = ({ data, xKey, yKey, label, unit = null }) => (
  <BarChart
    width={1000}
    height={500}
    data={data}
    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey={xKey} />
    <YAxis label={{ value: label, angle: -90, position: "left" }} unit={unit} />
    <Bar dataKey={yKey} stroke="#DD6969" fill="#DD6969" />
  </BarChart>
);

export { CustomAreaChart, CustomBarChart };
