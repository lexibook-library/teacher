import { useState } from "react";
import { activities, readingTasks } from "../data/mockData";
import { Badge, Card, DataTable, PageHeader, ProgressBar } from "../components/ui";

const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"];
const slots = ["07:30", "09:15", "14:00"];

export default function ReadingPlan() {
  const [tab, setTab] = useState("Kế hoạch đọc sách");
  return (
    <>
      <PageHeader title="Kế hoạch đọc sách và thời khóa biểu" description="Xem nhiệm vụ đọc dưới dạng danh sách hoặc lịch tuần." />
      <div className="mb-5 flex gap-2">{["Kế hoạch đọc sách", "Thời khóa biểu"].map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === item ? "bg-brand text-white" : "bg-white text-ink"}`}>{item}</button>)}</div>
      {tab === "Kế hoạch đọc sách" ? (
        <DataTable rows={readingTasks} columns={[
          { key: "book", title: "Tên sách", render: (row) => row.book },
          { key: "class", title: "Lớp", render: (row) => row.className },
          { key: "time", title: "Thời gian", render: (row) => row.time },
          { key: "goal", title: "Mục tiêu", render: () => "Đọc, ghi chú và hoàn thành câu hỏi đọc hiểu" },
          { key: "progress", title: "Tiến độ", render: (row) => <div className="min-w-40"><ProgressBar value={row.progress} /></div> },
          { key: "status", title: "Trạng thái", render: (row) => <Badge status={row.status} /> },
        ]} />
      ) : (
        <Card>
          <div className="grid min-w-[720px] grid-cols-[90px_repeat(5,1fr)] gap-3 overflow-x-auto">
            <div />
            {days.map((day) => <div key={day} className="rounded-xl bg-gray-50 p-3 text-center text-sm font-bold">{day}</div>)}
            {slots.map((slot, slotIndex) => (
              <>
                <div key={slot} className="rounded-xl bg-gray-50 p-3 text-sm font-semibold">{slot}</div>
                {days.map((day, dayIndex) => {
                  const activity = activities[(slotIndex + dayIndex) % activities.length];
                  return <div key={day + slot} className="rounded-xl border border-orange-100 bg-brand-soft p-3"><p className="text-sm font-bold text-ink">{activity.name}</p><p className="mt-1 text-xs text-muted">{activity.className}</p><div className="mt-2"><Badge status={activity.status} /></div></div>;
                })}
              </>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
