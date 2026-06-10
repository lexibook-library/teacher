import { useState } from "react";
import { Camera, Save } from "lucide-react";
import { Button, Card, Field, inputClass, PageHeader, Toast } from "../components/ui";

export default function Settings() {
  const [toast, setToast] = useState("");
  return (
    <>
      <PageHeader title="Cài đặt tài khoản" description="Cập nhật thông tin cá nhân, mật khẩu và cấu hình nhận thông báo." />
      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <Card>
          <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-brand-soft text-brand"><Camera className="h-9 w-9" /></div>
          <Button variant="secondary" className="mt-5 w-full">Đổi ảnh đại diện</Button>
          <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-muted">Tài khoản giáo viên đang hoạt động tại Trường Tiểu học Nguyễn Du.</div>
        </Card>
        <div className="space-y-5">
          <Card>
            <h2 className="mb-4 text-base font-bold text-ink">Thông tin cá nhân giáo viên</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Họ và tên"><input className={inputClass} defaultValue="Nguyễn Văn An" /></Field>
              <Field label="Email"><input className={inputClass} defaultValue="an.nguyen@truonghoc.vn" /></Field>
              <Field label="Số điện thoại"><input className={inputClass} defaultValue="0901 234 567" /></Field>
              <Field label="Trường"><input className={inputClass} defaultValue="Tiểu học Nguyễn Du" /></Field>
              <Field label="Bộ môn"><input className={inputClass} defaultValue="Ngữ văn - Đọc hiểu" /></Field>
            </div>
          </Card>
          <Card>
            <h2 className="mb-4 text-base font-bold text-ink">Đổi mật khẩu</h2>
            <div className="grid gap-4 md:grid-cols-3"><Field label="Mật khẩu hiện tại"><input className={inputClass} type="password" /></Field><Field label="Mật khẩu mới"><input className={inputClass} type="password" /></Field><Field label="Nhập lại mật khẩu"><input className={inputClass} type="password" /></Field></div>
          </Card>
          <Card>
            <h2 className="mb-4 text-base font-bold text-ink">Cài đặt nhận thông báo</h2>
            {["Thông báo khi học sinh nộp bài", "Nhắc bộ đề sắp hết hạn", "Báo cáo tuần qua email"].map((item) => <label key={item} className="mb-3 flex items-center justify-between rounded-xl bg-gray-50 p-3 text-sm font-semibold"><span>{item}</span><input type="checkbox" defaultChecked className="h-5 w-5" /></label>)}
            <div className="mt-5 flex justify-end"><Button onClick={() => setToast("Đã cập nhật cài đặt tài khoản")}><Save className="h-4 w-4" />Lưu thay đổi</Button></div>
          </Card>
        </div>
      </div>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
