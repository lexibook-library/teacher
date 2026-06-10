import { useState } from "react";
import { Download, FileCheck2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, DataTable, FileUpload, PageHeader, Toast } from "../components/ui";

const previewRows = [
  { id: "1", content: "Dế Mèn học được điều gì sau khi trêu chị Cốc?", type: "Một lựa chọn", answer: "Không nên kiêu căng", book: "Dế Mèn phiêu lưu ký", chapter: "Bài học đường đời đầu tiên", skill: "Suy luận", status: "Hợp lệ" },
  { id: "2", content: "", type: "Đúng / Sai", answer: "Đúng", book: "Hoàng tử bé", chapter: "Bông hồng", skill: "Truy xuất thông tin", status: "Thiếu nội dung" },
  { id: "3", content: "Sắp xếp các sự kiện trong chương theo thứ tự đúng.", type: "Sắp xếp theo thứ tự đúng", answer: "1-2-3-4", book: "Đất rừng phương Nam", chapter: "Rừng tràm", skill: "Trình tự hoặc tóm tắt", status: "Hợp lệ" },
];

export default function ImportQuestions() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [toast, setToast] = useState("");
  return (
    <>
      <PageHeader title="Import câu hỏi" description="Tải danh sách câu hỏi từ Excel và kiểm tra dữ liệu trước khi đưa vào ngân hàng." action={<Button variant="secondary"><Download className="h-4 w-4" />Tải file mẫu</Button>} />
      <Card>
        <FileUpload onPick={setFile} label="Kéo thả file Excel hoặc bấm để chọn file" />
        <p className="mt-3 text-sm text-muted">Định dạng hỗ trợ: .xlsx, .xls. Các dòng thiếu dữ liệu sẽ được đánh dấu màu đỏ.</p>
        {file ? <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm font-semibold text-ink">Đã chọn: {file}</div> : null}
      </Card>
      {file ? (
        <Card className="mt-5">
          <div className="mb-4 flex items-center gap-2 text-base font-bold text-ink"><FileCheck2 className="h-5 w-5 text-brand" />Bảng xem trước</div>
          <DataTable
            rows={previewRows}
            columns={[
              { key: "stt", title: "STT", render: (_, index) => index + 1 },
              { key: "content", title: "Nội dung câu hỏi", render: (row) => <span className={row.status !== "Hợp lệ" ? "font-semibold text-red-600" : ""}>{row.content || "Thiếu nội dung"}</span> },
              { key: "type", title: "Loại", render: (row) => row.type },
              { key: "answer", title: "Đáp án", render: (row) => row.answer },
              { key: "book", title: "Sách", render: (row) => row.book },
              { key: "chapter", title: "Chương", render: (row) => row.chapter },
              { key: "skill", title: "Tiêu chí", render: (row) => row.skill },
              { key: "status", title: "Trạng thái kiểm tra", render: (row) => <Badge status={row.status} /> },
            ]}
          />
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => navigate("/questions")}>Hủy</Button>
            <Button onClick={() => setToast("Đã import 2 câu hỏi hợp lệ")}>Xác nhận import</Button>
          </div>
        </Card>
      ) : null}
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
