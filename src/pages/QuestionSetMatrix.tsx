import { useMemo, useState } from "react";
import { Eye, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { books, skillScores, skills } from "../data/mockData";
import { Button, Card, Field, inputClass, Modal, PageHeader, ProgressBar, textareaClass, Toast } from "../components/ui";

export default function QuestionSetMatrix() {
  const navigate = useNavigate();
  const [target, setTarget] = useState(24);
  const [counts, setCounts] = useState<Record<string, number>>(Object.fromEntries(skills.map((skill) => [skill, 4])));
  const [preview, setPreview] = useState(false);
  const [toast, setToast] = useState("");
  const total = useMemo(() => Object.values(counts).reduce((sum, value) => sum + value, 0), [counts]);

  return (
    <>
      <PageHeader title="Tạo bộ đề theo ma trận" description="Phân bổ số lượng câu hỏi theo từng tiêu chí kỹ năng đọc." />
      <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
        <Card>
          <h2 className="mb-4 text-base font-bold text-ink">Thông tin bộ đề</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Tên bộ đề"><input className={inputClass} defaultValue="Bộ đề đọc hiểu tháng 6" /></Field>
            <Field label="Chọn sách"><select className={inputClass}>{books.map((book) => <option key={book.id}>{book.name}</option>)}</select></Field>
            <Field label="Chọn chương"><select className={inputClass}>{books[0].chapters.map((chapter) => <option key={chapter}>{chapter}</option>)}</select></Field>
            <Field label="Tổng số câu hỏi"><input className={inputClass} type="number" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></Field>
            <Field label="Thời gian làm bài"><input className={inputClass} defaultValue="35 phút" /></Field>
            <Field label="Mô tả bộ đề"><textarea className={textareaClass} defaultValue="Đánh giá khả năng đọc hiểu theo 6 tiêu chí cốt lõi." /></Field>
          </div>
        </Card>
        <Card>
          <h2 className="mb-3 text-base font-bold text-ink">Kiểm tra ma trận</h2>
          <p className={`text-sm font-semibold ${total === target ? "text-green-600" : "text-red-600"}`}>Đã chọn {total}/{target} câu hỏi</p>
          {total !== target ? <p className="mt-2 text-sm text-red-600">Tổng số câu được chọn phải bằng tổng số lượng câu hỏi của bộ đề.</p> : null}
          <div className="mt-5 grid gap-3">
            <Button variant="secondary" onClick={() => setPreview(true)}><Eye className="h-4 w-4" />Xem trước</Button>
            <Button onClick={() => setToast("Đã tạo bộ đề theo ma trận")}><Save className="h-4 w-4" />Tạo bộ đề</Button>
            <Button variant="ghost" onClick={() => navigate("/question-sets")}>Hủy</Button>
          </div>
        </Card>
      </div>
      <Card className="mt-5">
        <h2 className="mb-4 text-base font-bold text-ink">Phân bổ câu hỏi theo kỹ năng đọc</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill, index) => (
            <div key={skill} className="rounded-xl border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold text-ink">{skill}</h3>
                <span className="text-sm text-muted">Có {skillScores[index].count} câu</span>
              </div>
              <input className={inputClass} type="number" value={counts[skill]} onChange={(event) => setCounts((value) => ({ ...value, [skill]: Number(event.target.value) }))} />
              <div className="mt-3"><ProgressBar value={(counts[skill] / Math.max(1, target)) * 100} /></div>
            </div>
          ))}
        </div>
      </Card>
      {preview ? <Modal title="Xem trước ma trận bộ đề" onClose={() => setPreview(false)}><div className="space-y-2">{skills.map((skill) => <div key={skill} className="flex justify-between rounded-xl bg-gray-50 p-3"><span>{skill}</span><strong>{counts[skill]} câu</strong></div>)}</div></Modal> : null}
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
