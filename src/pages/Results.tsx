import { useMemo, useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { activities, classes, results } from "../data/mockData";
import { Badge, Button, Card, DataTable, Field, FilterSelect, inputClass, Modal, PageHeader, SearchInput, textareaClass, Toast } from "../components/ui";

export default function Results() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [className, setClassName] = useState("");
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const rows = useMemo(() => results.filter((row) => row.student.toLowerCase().includes(search.toLowerCase()) && (!className || row.className === className)), [className, search]);
  return (
    <>
      <PageHeader title="Kết quả bài kiểm tra" description="Theo dõi điểm số, số câu đúng, trạng thái hoàn thành và mở lại bài khi cần." action={<Button variant="secondary" onClick={() => setToast("Đã xuất báo cáo Excel demo")}><Download className="h-4 w-4" />Xuất Excel</Button>} />
      <Card className="mb-5"><div className="grid gap-3 md:grid-cols-4"><FilterSelect label="Hoạt động" value="" onChange={() => undefined} options={activities.map((item) => item.name)} /><FilterSelect label="Lớp" value={className} onChange={setClassName} options={classes} /><FilterSelect label="Trạng thái" value="" onChange={() => undefined} options={["Hoàn thành", "Chưa hoàn thành"]} /><SearchInput value={search} onChange={setSearch} placeholder="Tìm học sinh" /></div></Card>
      <DataTable rows={rows} columns={[
        { key: "student", title: "Họ và tên", render: (row) => <strong>{row.student}</strong> },
        { key: "class", title: "Lớp", render: (row) => row.className },
        { key: "activity", title: "Hoạt động", render: (row) => row.activity },
        { key: "score", title: "Điểm", render: (row) => row.score.toFixed(1) },
        { key: "correct", title: "Câu đúng", render: (row) => `${row.correct}/${row.total}` },
        { key: "time", title: "Thời gian", render: (row) => row.time },
        { key: "attempts", title: "Lần làm", render: (row) => row.attempts },
        { key: "status", title: "Trạng thái", render: (row) => <Badge status={row.status} /> },
        { key: "action", title: "Thao tác", render: (row) => <div className="flex gap-2"><Button variant="secondary" onClick={() => navigate(`/results/${row.id}`)}>Xem chi tiết</Button><Button variant="ghost" onClick={() => setOpen(true)}><RotateCcw className="h-4 w-4" />Mở lại</Button></div> },
      ]} />
      {open ? <Modal title="Xác nhận mở lại bài" onClose={() => setOpen(false)}><div className="grid gap-4"><Field label="Thời hạn mới"><input type="datetime-local" className={inputClass} /></Field><Field label="Lý do mở lại bài"><textarea className={textareaClass} defaultValue="Học sinh gặp sự cố khi nộp bài." /></Field></div><div className="mt-5 flex justify-end gap-3"><Button variant="ghost" onClick={() => setOpen(false)}>Hủy</Button><Button onClick={() => { setOpen(false); setToast("Đã mở lại bài thành công"); }}>Xác nhận</Button></div></Modal> : null}
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
