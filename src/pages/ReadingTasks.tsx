import { useState } from "react";
import { Plus } from "lucide-react";
import { books, classes, readingTasks } from "../data/mockData";
import { Badge, Button, DataTable, Field, inputClass, Modal, PageHeader, ProgressBar, textareaClass, Toast } from "../components/ui";

export default function ReadingTasks() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  return (
    <>
      <PageHeader title="Giao nhiệm vụ đọc sách" description="Lập nhiệm vụ đọc theo tuần hoặc tháng và theo dõi tiến độ hoàn thành." action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" />Tạo nhiệm vụ</Button>} />
      <DataTable rows={readingTasks} columns={[
        { key: "name", title: "Tên nhiệm vụ", render: (row) => <strong>{row.name}</strong> },
        { key: "book", title: "Tên sách", render: (row) => row.book },
        { key: "class", title: "Lớp", render: (row) => row.className },
        { key: "time", title: "Thời gian", render: (row) => row.time },
        { key: "progress", title: "Tiến độ", render: (row) => <div className="min-w-40"><ProgressBar value={row.progress} /><p className="mt-1 text-xs text-muted">{row.progress}%</p></div> },
        { key: "status", title: "Trạng thái", render: (row) => <Badge status={row.status} /> },
        { key: "action", title: "Thao tác", render: () => <Button variant="secondary" onClick={() => setOpen(true)}>Sửa</Button> },
      ]} />
      {open ? (
        <Modal title="Tạo nhiệm vụ đọc sách" onClose={() => setOpen(false)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Chọn sách"><select className={inputClass}>{books.map((book) => <option key={book.id}>{book.name}</option>)}</select></Field>
            <Field label="Chọn lớp"><select className={inputClass}>{classes.map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field label="Chu kỳ"><select className={inputClass}><option>Tuần</option><option>Tháng</option></select></Field>
            <Field label="Thời gian bắt đầu"><input type="date" className={inputClass} /></Field>
            <Field label="Thời gian kết thúc"><input type="date" className={inputClass} /></Field>
          </div>
          <div className="mt-4"><Field label="Nội dung nhiệm vụ"><textarea className={textareaClass} defaultValue="Đọc chương được giao và ghi lại 3 chi tiết em thấy thú vị." /></Field></div>
          <div className="mt-4"><Field label="Ghi chú"><textarea className={textareaClass} defaultValue="Khuyến khích học sinh đọc cùng phụ huynh trong 15 phút mỗi ngày." /></Field></div>
          <div className="mt-5 flex justify-end gap-3"><Button variant="ghost" onClick={() => setOpen(false)}>Hủy</Button><Button onClick={() => { setOpen(false); setToast("Đã lưu nhiệm vụ đọc sách"); }}>Lưu</Button></div>
        </Modal>
      ) : null}
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
