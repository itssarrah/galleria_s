import {
  ResponsiveContainer,
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
  <div className="flex justify-center p-10 w-full h-[25rem] flex-1">
    <ResponsiveContainer width={"90%"} height={"100%"}>
      <AreaChart
        data={data}
        margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
      >
        <defs>
          <linearGradient id="area-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="40%" stopColor="#DD6969" />
            <stop offset="70%" stopColor="#DD696933" />
            <stop offset="100%" stopColor="#FFFFFF00" />
          </linearGradient>
        </defs>
        <XAxis dataKey={xKey} />
        <YAxis
          label={{
            value: unit ? `${label} ( ${unit} )` : label,
            angle: -90,
            position: "center",
          }}
        />
        <Area dataKey={yKey} stroke="#DD6969" fill="url(#area-fill)" />
        <Tooltip formatter={toolTipFormatter} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const CustomBarChart = ({ data, xKey, yKey, label, unit = null }) => (
  <div className="flex justify-center p-10 w-full h-[25rem] flex-1">
    <ResponsiveContainer width={"99%"} height={"100%"}>
      <BarChart
        data={data}
        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey={xKey} />
        <YAxis
          label={{
            value: unit ? `${label} ( ${unit} )` : label,
            angle: -90,
            position: "center",
          }}
        />
        <Bar dataKey={yKey} stroke="#DD6969" fill="#DD6969" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export { CustomAreaChart, CustomBarChart };
