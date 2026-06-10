import { useParams } from "react-router-dom";
import { results, skillScores } from "../data/mockData";
import { Badge, Card, DataTable, PageHeader } from "../components/ui";
import { ChartCard, SkillRadarChart } from "../components/charts";

export default function ResultDetail() {
  const params = useParams();
  const result = results.find((item) => item.id === params.id) ?? results[0];
  const answerRows = skillScores.map((skill, index) => ({
    id: String(index),
    question: `Câu ${index + 1}: Nội dung kiểm tra kỹ năng ${skill.skill.toLowerCase()}`,
    student: index % 2 ? "Phương án B" : "Phương án A",
    correct: index % 2 ? "Phương án B" : "Phương án C",
    status: index % 2 ? "Đúng" : "Sai",
    explain: "Học sinh cần đối chiếu chi tiết trong đoạn văn trước khi kết luận.",
  }));
  return (
    <>
      <PageHeader title={`Chi tiết kết quả - ${result.student}`} description="Phân tích điểm tổng, tỷ lệ đúng và năng lực theo 6 tiêu chí đọc hiểu." />
      <div className="grid gap-5 lg:grid-cols-4">
        {[["Điểm tổng", result.score.toFixed(1)], ["Tỷ lệ câu đúng", `${Math.round((result.correct / result.total) * 100)}%`], ["Thời gian làm bài", result.time], ["Lần làm bài", result.attempts]].map(([label, value]) => <Card key={label}><p className="text-sm text-muted">{label}</p><p className="mt-2 text-2xl font-bold text-ink">{value}</p></Card>)}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[420px_1fr]">
        <Card><h2 className="text-base font-bold text-ink">Thông tin học sinh</h2><div className="mt-4 space-y-3 text-sm"><p><strong>Họ tên:</strong> {result.student}</p><p><strong>Lớp:</strong> {result.className}</p><p><strong>Hoạt động:</strong> {result.activity}</p><p><strong>Trạng thái:</strong> <Badge status={result.status} /></p></div></Card>
        <ChartCard title="Năng lực theo 6 tiêu chí"><SkillRadarChart data={skillScores} /></ChartCard>
      </div>
      <Card className="mt-5"><h2 className="mb-4 text-base font-bold text-ink">Danh sách từng câu hỏi</h2><DataTable rows={answerRows} columns={[
        { key: "question", title: "Câu hỏi", render: (row) => row.question },
        { key: "student", title: "Câu trả lời", render: (row) => row.student },
        { key: "correct", title: "Đáp án đúng", render: (row) => row.correct },
        { key: "status", title: "Trạng thái", render: (row) => <Badge status={row.status} /> },
        { key: "explain", title: "Giải thích", render: (row) => row.explain },
      ]} /></Card>
    </>
  );
}
