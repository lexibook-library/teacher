import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "./ui";

const palette = ["#F97316", "#2563EB", "#16A34A", "#DC2626", "#9333EA", "#0891B2"];

export function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <h2 className="mb-4 text-base font-bold text-ink">{title}</h2>
      <div className="h-72">{children}</div>
    </Card>
  );
}

export function ReadingLineChart({ data }: { data: { month: string; books?: number; lexile?: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="books" name="Sách đã đọc" stroke="#F97316" strokeWidth={3} />
        <Line type="monotone" dataKey="lexile" name="Lexile" stroke="#2563EB" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SkillBarChart({ data }: { data: { skill: string; score: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="skill" tick={{ fontSize: 11 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="score" name="Điểm kỹ năng" radius={[8, 8, 0, 0]} fill="#F97316" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CompletionPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} label>
          {data.map((entry, index) => <Cell key={entry.name} fill={palette[index % palette.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function SkillRadarChart({ data }: { data: { skill: string; score: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
        <Radar dataKey="score" fill="#F97316" fillOpacity={0.35} stroke="#F97316" strokeWidth={2} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}
