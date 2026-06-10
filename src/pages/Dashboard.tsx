import { BookMarked, CheckCircle2, ClipboardList, UsersRound } from "lucide-react";
import { activities, completionData, monthlyReading, skillScores } from "../data/mockData";
import { Badge, Button, Card, PageHeader, ProgressBar } from "../components/ui";
import { ChartCard, CompletionPieChart, ReadingLineChart, SkillBarChart } from "../components/charts";

const stats = [
  { label: "học sinh đang theo dõi", value: "1.248", change: "+12%", icon: UsersRound },
  { label: "bộ câu hỏi", value: "86", change: "+8%", icon: BookMarked },
  { label: "hoạt động đang diễn ra", value: "24", change: "+5%", icon: ClipboardList },
  { label: "tỷ lệ hoàn thành trung bình", value: "78%", change: "-2%", icon: CheckCircle2 },
];

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Xin chào, Nguyễn Văn An"
        description="Theo dõi hoạt động đọc sách và kết quả học tập của học sinh."
        action={<select className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm"><option>Học kỳ II - 2025/2026</option><option>30 ngày gần nhất</option></select>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl font-bold text-ink">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
                <div className="rounded-xl bg-brand-soft p-3 text-brand"><Icon className="h-6 w-6" /></div>
              </div>
              <p className={`mt-4 text-sm font-semibold ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{stat.change} so với tháng trước</p>
            </Card>
          );
        })}
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2"><ChartCard title="Tiến độ đọc sách theo tháng"><ReadingLineChart data={monthlyReading} /></ChartCard></div>
        <ChartCard title="Tình trạng hoàn thành hoạt động"><CompletionPieChart data={completionData} /></ChartCard>
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2"><ChartCard title="Kết quả theo 6 tiêu chí kỹ năng đọc"><SkillBarChart data={skillScores} /></ChartCard></div>
        <Card>
          <h2 className="mb-4 text-base font-bold text-ink">Việc cần xử lý</h2>
          {["3 bộ đề sắp hết hạn", "28 học sinh chưa hoàn thành", "5 bài kiểm tra cần xem lại", "2 nhiệm vụ đọc sách cần cập nhật"].map((item) => (
            <div key={item} className="mb-3 flex items-center justify-between rounded-xl bg-gray-50 p-3">
              <span className="text-sm font-semibold text-ink">{item}</span>
              <Button variant="secondary" className="min-h-8 px-3">Xử lý</Button>
            </div>
          ))}
        </Card>
      </div>
      <Card className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">Hoạt động gần đây</h2>
          <Button variant="secondary">Xem tất cả</Button>
        </div>
        <div className="grid gap-3">
          {activities.map((activity) => (
            <div key={activity.id} className="grid gap-3 rounded-xl border border-gray-100 p-4 md:grid-cols-[1.4fr_.7fr_.7fr_.7fr_1fr_auto] md:items-center">
              <div className="font-semibold text-ink">{activity.name}</div>
              <div className="text-sm text-muted">{activity.className}</div>
              <div className="text-sm text-muted">{activity.deadline}</div>
              <Badge status={activity.status} />
              <div><ProgressBar value={activity.completion} /><p className="mt-1 text-xs text-muted">{activity.completion}% hoàn thành</p></div>
              <Button variant="ghost">Xem chi tiết</Button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
