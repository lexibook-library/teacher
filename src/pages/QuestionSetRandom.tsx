import { useState } from "react";
import { Shuffle } from "lucide-react";
import { books, questions } from "../data/mockData";
import { Button, Card, Field, inputClass, Modal, PageHeader, Toast } from "../components/ui";

export default function QuestionSetRandom() {
  const [preview, setPreview] = useState(false);
  const [toast, setToast] = useState("");
  return (
    <>
      <PageHeader title="Tạo bộ đề ngẫu nhiên" description="Chọn điều kiện và để hệ thống tạo nhanh bộ đề phù hợp." />
      <Card className="max-w-4xl">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Tên bộ đề"><input className={inputClass} defaultValue="Bộ đề ngẫu nhiên lớp 5A1" /></Field>
          <Field label="Chọn sách"><select className={inputClass}>{books.map((book) => <option key={book.id}>{book.name}</option>)}</select></Field>
          <Field label="Chọn chương"><select className={inputClass}><option>Không bắt buộc</option>{books[0].chapters.map((chapter) => <option key={chapter}>{chapter}</option>)}</select></Field>
          <Field label="Số lượng câu hỏi"><input className={inputClass} type="number" defaultValue={20} /></Field>
          <Field label="Mức độ câu hỏi"><select className={inputClass}><option>Dễ</option><option>Trung bình</option><option>Khó</option><option>Tổng hợp</option></select></Field>
          <Field label="Thời gian làm bài"><input className={inputClass} defaultValue="30 phút" /></Field>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 text-sm font-semibold"><input type="checkbox" defaultChecked />Trộn thứ tự câu hỏi</label>
          <label className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 text-sm font-semibold"><input type="checkbox" defaultChecked />Trộn thứ tự đáp án</label>
        </div>
        <div className="mt-5"><Button onClick={() => setPreview(true)}><Shuffle className="h-4 w-4" />Tạo bộ đề ngẫu nhiên</Button></div>
      </Card>
      {preview ? <Modal title="Danh sách câu hỏi đã tạo" onClose={() => setPreview(false)}><ol className="space-y-2 text-sm">{questions.slice(0, 8).map((question, index) => <li key={question.id} className="rounded-xl bg-gray-50 p-3">{index + 1}. {question.content}</li>)}</ol><div className="mt-4"><Button onClick={() => { setPreview(false); setToast("Đã lưu bộ đề ngẫu nhiên"); }}>Lưu bộ đề</Button></div></Modal> : null}
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
