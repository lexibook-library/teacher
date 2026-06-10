import { useMemo, useState } from "react";
import { Eye, FileUp, Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { books, questions, questionTypes, skills } from "../data/mockData";
import { Badge, Button, Card, DataTable, FilterSelect, Modal, PageHeader, Pagination, SearchInput, Toast } from "../components/ui";

export default function Questions() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [book, setBook] = useState("");
  const [skill, setSkill] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => questions.filter((question) =>
    question.content.toLowerCase().includes(query.toLowerCase()) &&
    (!type || question.type === type) &&
    (!book || question.book === book) &&
    (!skill || question.skill === skill)
  ), [book, query, skill, type]);
  const pageRows = filtered.slice((page - 1) * 8, page * 8);

  return (
    <>
      <PageHeader title="Ngân hàng câu hỏi" description="Quản lý câu hỏi đọc hiểu theo sách, chương và tiêu chí kỹ năng." action={<Button onClick={() => navigate("/questions/create")}><Plus className="h-4 w-4" />Thêm câu hỏi</Button>} />
      <Card className="mb-5">
        <div className="grid gap-3 lg:grid-cols-[1.3fr_repeat(4,minmax(150px,1fr))_auto_auto]">
          <SearchInput value={query} onChange={setQuery} placeholder="Tìm theo nội dung câu hỏi" />
          <FilterSelect label="Loại" value={type} onChange={setType} options={questionTypes} />
          <FilterSelect label="Sách" value={book} onChange={setBook} options={books.map((item) => item.name)} />
          <FilterSelect label="Chương" value="" onChange={() => undefined} options={books.flatMap((item) => item.chapters)} />
          <FilterSelect label="Tiêu chí" value={skill} onChange={setSkill} options={skills} />
          <Button variant="secondary" onClick={() => navigate("/questions/import")}><FileUp className="h-4 w-4" />Import</Button>
          <Button onClick={() => navigate("/questions/create")}><Plus className="h-4 w-4" />Thêm</Button>
        </div>
      </Card>
      <DataTable
        rows={pageRows}
        columns={[
          { key: "check", title: "", render: () => <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand" /> },
          { key: "id", title: "Mã", render: (row) => <span className="font-semibold text-ink">{row.id}</span> },
          { key: "content", title: "Nội dung câu hỏi", render: (row) => <span className="max-w-sm line-clamp-2">{row.content}</span> },
          { key: "type", title: "Loại", render: (row) => row.type },
          { key: "book", title: "Sách", render: (row) => row.book },
          { key: "chapter", title: "Chương", render: (row) => row.chapter },
          { key: "skill", title: "Tiêu chí", render: (row) => row.skill },
          { key: "date", title: "Cập nhật", render: (row) => row.updatedAt },
          { key: "status", title: "Trạng thái", render: (row) => <Badge status={row.status} /> },
          { key: "actions", title: "Thao tác", render: (row) => (
            <div className="flex gap-1">
              <button className="rounded-lg p-2 text-muted hover:bg-gray-100" onClick={() => setModal(row.id)} aria-label="Xem"><Eye className="h-4 w-4" /></button>
              <button className="rounded-lg p-2 text-muted hover:bg-gray-100" onClick={() => navigate(`/questions/${row.id}/edit`)} aria-label="Sửa"><Pencil className="h-4 w-4" /></button>
              <button className="rounded-lg p-2 text-red-600 hover:bg-red-50" onClick={() => setToast("Đã xóa câu hỏi khỏi danh sách demo")} aria-label="Xóa"><Trash2 className="h-4 w-4" /></button>
            </div>
          ) },
        ]}
      />
      <Pagination total={filtered.length} page={page} onPage={setPage} />
      {modal ? <Modal title={`Chi tiết câu hỏi ${modal}`} onClose={() => setModal(null)}><p className="text-sm text-muted">Câu hỏi, đáp án, media và giải thích sẽ hiển thị tại đây khi tích hợp API thật.</p><div className="mt-4"><Button onClick={() => setModal(null)}>Đã hiểu</Button></div></Modal> : null}
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
