import { useState } from "react";
import { Copy, Eye, Pencil, Send, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { books, questionSets } from "../data/mockData";
import { Badge, Button, Card, DataTable, FilterSelect, PageHeader, SearchInput, Toast } from "../components/ui";

const tabs = ["Bộ đề của tôi", "Bộ đề hệ thống", "Đã lưu nháp"];

export default function QuestionSets() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(tabs[0]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const rows = questionSets.filter((set) => set.name.toLowerCase().includes(search.toLowerCase()) && (tab !== "Đã lưu nháp" || set.status === "Bản nháp") && (tab !== "Bộ đề hệ thống" || set.creator === "Hệ thống"));
  return (
    <>
      <PageHeader title="Danh sách bộ đề" description="Quản lý bộ đề của giáo viên, bộ đề hệ thống và bản nháp." action={<div className="flex gap-2"><Button variant="secondary" onClick={() => navigate("/question-sets/create-random")}>Tạo ngẫu nhiên</Button><Button onClick={() => navigate("/question-sets/create-matrix")}>Tạo theo ma trận</Button></div>} />
      <Card className="mb-5">
        <div className="mb-4 flex flex-wrap gap-2">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === item ? "bg-brand text-white" : "bg-gray-100 text-ink"}`}>{item}</button>)}</div>
        <div className="grid gap-3 md:grid-cols-[1fr_240px]"><SearchInput value={search} onChange={setSearch} placeholder="Tìm bộ đề" /><FilterSelect label="Sách" value="" onChange={() => undefined} options={books.map((book) => book.name)} /></div>
      </Card>
      <DataTable rows={rows} columns={[
        { key: "id", title: "Mã bộ đề", render: (row) => <strong>{row.id}</strong> },
        { key: "name", title: "Tên bộ đề", render: (row) => row.name },
        { key: "book", title: "Sách", render: (row) => row.book },
        { key: "chapter", title: "Chương", render: (row) => row.chapter },
        { key: "count", title: "Số câu", render: (row) => row.count },
        { key: "type", title: "Hình thức tạo", render: (row) => row.type },
        { key: "creator", title: "Người tạo", render: (row) => row.creator },
        { key: "date", title: "Ngày tạo", render: (row) => row.date },
        { key: "status", title: "Trạng thái", render: (row) => <Badge status={row.status} /> },
        { key: "actions", title: "Thao tác", render: () => <div className="flex gap-1">{[Eye, Pencil, Copy, Trash2, Send].map((Icon, index) => <button key={index} onClick={() => setToast(index === 4 ? "Đã chuyển sang màn hình giao bộ đề" : "Đã thực hiện thao tác demo")} className="rounded-lg p-2 text-muted hover:bg-gray-100"><Icon className="h-4 w-4" /></button>)}</div> },
      ]} />
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
