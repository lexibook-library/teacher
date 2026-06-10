import { useState } from "react";
import { Download, FileText, Printer } from "lucide-react";
import { classes, completionData, monthlyReading, skillScores, students } from "../data/mockData";
import { Button, Card, DataTable, FilterSelect, PageHeader, Toast } from "../components/ui";
import { ChartCard, CompletionPieChart, ReadingLineChart, SkillBarChart, SkillRadarChart } from "../components/charts";

const reportTabs = ["Tổng quan", "Cá nhân", "Lớp", "Khối", "Trường", "Các trường tham gia"];

export default function Reports() {
  const [tab, setTab] = useState(reportTabs[0]);
  const [toast, setToast] = useState("");
  const ranking = students.slice(0, 8).map((student, index) => ({ id: String(index), name: index % 2 ? classes[index % classes.length] : student, books: 8 + index, lexile: 540 + index * 22, comprehension: 68 + index * 3, complete: `${72 + index * 2}%` }));
  return (
    <>
      <PageHeader title="Báo cáo thống kê" description="Phân tích tiến độ đọc, Lexile và chỉ số đọc hiểu theo nhiều phạm vi." action={<div className="flex flex-wrap gap-2"><Button variant="secondary" onClick={() => setToast("Đã xuất Excel demo")}><Download className="h-4 w-4" />Excel</Button><Button variant="secondary" onClick={() => setToast("Đã xuất PDF demo")}><FileText className="h-4 w-4" />PDF</Button><Button variant="secondary" onClick={() => setToast("Đã gửi lệnh in báo cáo")}><Printer className="h-4 w-4" />In</Button></div>} />
      <Card className="mb-5">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <FilterSelect label="Khoảng thời gian" value="" onChange={() => undefined} options={["Tuần này", "Tháng này", "Học kỳ II"]} />
          <FilterSelect label="Trường" value="" onChange={() => undefined} options={["Tiểu học Nguyễn Du", "THCS Lê Quý Đôn"]} />
          <FilterSelect label="Khối" value="" onChange={() => undefined} options={["Khối 3", "Khối 4", "Khối 5", "Khối 6", "Khối 7"]} />
          <FilterSelect label="Lớp" value="" onChange={() => undefined} options={classes} />
          <FilterSelect label="Cá nhân" value="" onChange={() => undefined} options={students} />
          <FilterSelect label="Sách" value="" onChange={() => undefined} options={["Dế Mèn phiêu lưu ký", "Hoàng tử bé"]} />
        </div>
      </Card>
      <div className="mb-5 flex flex-wrap gap-2">{reportTabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === item ? "bg-brand text-white" : "bg-white text-ink"}`}>{item}</button>)}</div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {[["Tổng học sinh", "1.248"], ["Sách đã đọc", "3.842"], ["Hoạt động đã giao", "186"], ["Hoàn thành", "78%"], ["Lexile TB", "655L"], ["Đọc hiểu TB", "74%"]].map(([label, value]) => <Card key={label}><p className="text-sm text-muted">{label}</p><p className="mt-2 text-2xl font-bold text-ink">{value}</p></Card>)}
      </div>
      <Card className="mt-5 border-orange-200 bg-brand-soft">
        <h2 className="font-bold text-ink">Quy tắc Lexile</h2>
        <p className="mt-2 text-sm text-muted">Học sinh đạt từ 80% trở lên với bộ câu hỏi của sách sẽ nhận trọn điểm Lexile của sách. Nếu dưới 80%, học sinh cần đọc lại và trả lời lại bộ câu hỏi trước khi cộng điểm Lexile.</p>
      </Card>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <ChartCard title="Điểm Lexile trung bình theo tháng"><ReadingLineChart data={monthlyReading} /></ChartCard>
        <ChartCard title="Kết quả theo lớp"><SkillBarChart data={skillScores} /></ChartCard>
        <ChartCard title="Biểu đồ radar 6 tiêu chí kỹ năng đọc"><SkillRadarChart data={skillScores} /></ChartCard>
        <ChartCard title="Hoàn thành và chưa hoàn thành"><CompletionPieChart data={completionData} /></ChartCard>
      </div>
      <Card className="mt-5"><h2 className="mb-4 text-base font-bold text-ink">Bảng xếp hạng</h2><DataTable rows={ranking} columns={[
        { key: "stt", title: "STT", render: (_, index) => index + 1 },
        { key: "name", title: "Học sinh hoặc lớp", render: (row) => <strong>{row.name}</strong> },
        { key: "books", title: "Số sách đã đọc", render: (row) => row.books },
        { key: "lexile", title: "Điểm Lexile", render: (row) => `${row.lexile}L` },
        { key: "comprehension", title: "Chỉ số đọc hiểu", render: (row) => `${row.comprehension}%` },
        { key: "complete", title: "Tỷ lệ hoàn thành", render: (row) => row.complete },
      ]} /></Card>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
