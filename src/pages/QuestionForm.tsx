import { useMemo, useState } from "react";
import { ArrowLeft, Eye, GripVertical, Plus, Save, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { books, questions, questionTypes, skills } from "../data/mockData";
import { Button, Card, Field, FileUpload, inputClass, Modal, PageHeader, textareaClass, Toast } from "../components/ui";

export default function QuestionForm({ mode }: { mode: "create" | "edit" }) {
  const navigate = useNavigate();
  const params = useParams();
  const original = questions.find((item) => item.id === params.id);
  const [type, setType] = useState(original?.type ?? "Một lựa chọn");
  const [answers, setAnswers] = useState(["Câu trả lời A", "Câu trả lời B", "Câu trả lời C", "Câu trả lời D"]);
  const [media, setMedia] = useState("");
  const [preview, setPreview] = useState(false);
  const [toast, setToast] = useState("");
  const answerList = useMemo(() => type === "Đúng / Sai" ? ["Đúng", "Sai"] : answers, [answers, type]);

  function save(message: string) {
    setToast(message);
    window.setTimeout(() => navigate("/questions"), 700);
  }

  return (
    <>
      <PageHeader
        title={mode === "create" ? "Thêm câu hỏi" : `Chỉnh sửa câu hỏi ${params.id}`}
        description="Tạo câu hỏi đọc hiểu theo sách, chương, dạng câu hỏi và kỹ năng."
        action={<Button variant="secondary" onClick={() => navigate("/questions")}><ArrowLeft className="h-4 w-4" />Quay lại</Button>}
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <Card>
            <h2 className="mb-4 text-base font-bold text-ink">Thông tin cơ bản</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Chọn sách"><select className={inputClass} defaultValue={original?.book}>{books.map((book) => <option key={book.id}>{book.name}</option>)}</select></Field>
              <Field label="Chọn chương"><select className={inputClass}>{books.flatMap((book) => book.chapters).map((chapter) => <option key={chapter}>{chapter}</option>)}</select></Field>
              <Field label="Dạng câu hỏi"><select className={inputClass} value={type} onChange={(event) => setType(event.target.value)}>{questionTypes.map((item) => <option key={item}>{item}</option>)}</select></Field>
              <Field label="Tiêu chí kỹ năng đọc"><select className={inputClass}>{skills.map((skill) => <option key={skill}>{skill}</option>)}</select></Field>
              <Field label="Mức độ"><select className={inputClass}><option>Dễ</option><option>Trung bình</option><option>Khó</option></select></Field>
            </div>
          </Card>
          <Card>
            <h2 className="mb-4 text-base font-bold text-ink">Nội dung câu hỏi</h2>
            <Field label="Câu hỏi"><textarea className={textareaClass} defaultValue={original?.content ?? "Nhân vật chính đã thay đổi như thế nào sau sự việc trong câu chuyện?"} /></Field>
            <div className="mt-4"><FileUpload onPick={setMedia} label="Kéo thả hình ảnh, audio hoặc video cho câu hỏi" /></div>
            {media ? <div className="mt-3 rounded-xl bg-gray-50 p-3 text-sm font-semibold text-ink">Preview media: {media}</div> : null}
          </Card>
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-ink">Phần đáp án</h2>
              {type !== "Đúng / Sai" ? <Button variant="secondary" onClick={() => setAnswers((items) => [...items, `Câu trả lời ${items.length + 1}`])}><Plus className="h-4 w-4" />Thêm đáp án</Button> : null}
            </div>
            {type === "Điền khuyết" ? (
              <Field label="Đáp án chính xác"><input className={inputClass} defaultValue="bài học đường đời đầu tiên" /></Field>
            ) : (
              <div className="space-y-3">
                {answerList.map((answer, index) => (
                  <div key={answer + index} className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                    {type === "Sắp xếp theo thứ tự đúng" ? <GripVertical className="h-5 w-5 text-muted" /> : <input name="correct" type={type === "Đa lựa chọn" ? "checkbox" : "radio"} className="h-4 w-4 text-brand" defaultChecked={index === 0} />}
                    <input className={inputClass} value={answer} onChange={(event) => setAnswers((items) => items.map((item, answerIndex) => answerIndex === index ? event.target.value : item))} />
                    <Button variant="ghost" onClick={() => setToast("Đã thêm media cho đáp án demo")}>Media</Button>
                    {type !== "Đúng / Sai" ? <button onClick={() => setAnswers((items) => items.filter((_, answerIndex) => answerIndex !== index))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button> : null}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        <Card className="h-fit">
          <h2 className="mb-4 text-base font-bold text-ink">Thao tác</h2>
          <div className="grid gap-3">
            <Button variant="secondary" onClick={() => setToast("Đã lưu bản nháp câu hỏi")}><Save className="h-4 w-4" />Lưu nháp</Button>
            <Button variant="secondary" onClick={() => setPreview(true)}><Eye className="h-4 w-4" />Xem trước</Button>
            <Button onClick={() => save("Đã lưu câu hỏi thành công")}><Save className="h-4 w-4" />Lưu câu hỏi</Button>
            <Button variant="ghost" onClick={() => navigate("/questions")}>Hủy</Button>
          </div>
        </Card>
      </div>
      {preview ? <Modal title="Xem trước câu hỏi" onClose={() => setPreview(false)}><p className="font-semibold text-ink">Nhân vật chính đã thay đổi như thế nào sau sự việc trong câu chuyện?</p><div className="mt-4 space-y-2">{answerList.map((item) => <div key={item} className="rounded-xl border border-gray-200 p-3 text-sm">{item}</div>)}</div></Modal> : null}
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
