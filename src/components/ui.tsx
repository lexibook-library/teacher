import { ReactNode } from "react";
import { CheckCircle2, Search, UploadCloud, X } from "lucide-react";
import type { Status } from "../data/mockData";

export function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    secondary: "border border-orange-200 bg-white text-brand hover:bg-brand-soft",
    ghost: "text-ink hover:bg-gray-100",
    danger: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-gray-200 bg-white p-5 shadow-soft ${className}`}>{children}</section>;
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-2 text-sm text-muted">Trang chủ / {title}</div>
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Badge({ status }: { status: Status | string }) {
  const color =
    status === "Đang diễn ra" ? "bg-blue-50 text-blue-700 ring-blue-200" :
    status === "Hoàn thành" ? "bg-green-50 text-green-700 ring-green-200" :
    status === "Quá hạn" ? "bg-red-50 text-red-700 ring-red-200" :
    status === "Bản nháp" ? "bg-orange-50 text-orange-700 ring-orange-200" :
    "bg-gray-100 text-gray-700 ring-gray-200";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${color}`}>{status}</span>;
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2.5 rounded-full bg-gray-100">
      <div className="h-2.5 rounded-full bg-brand" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = "Tìm kiếm" }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

export function FilterSelect({ value, onChange, options, label }: { value: string; onChange: (value: string) => void; options: string[]; label: string }) {
  return (
    <select aria-label={label} className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100" value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">Tất cả {label.toLowerCase()}</option>
      {options.map((option) => <option key={option}>{option}</option>)}
    </select>
  );
}

export function DataTable<T extends object>({
  columns,
  rows,
  empty = "Không có dữ liệu phù hợp",
}: {
  columns: { key: string; title: string; render: (row: T, index: number) => ReactNode }[];
  rows: T[];
  empty?: string;
}) {
  return (
    <div className="table-scroll overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
        <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wide text-muted">
          <tr>{columns.map((column) => <th key={column.key} className="px-4 py-3">{column.title}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, index) => (
            <tr key={"id" in row && typeof row.id === "string" ? row.id : index} className="hover:bg-brand-soft/60">
              {columns.map((column) => <td key={column.key} className="px-4 py-3 align-top">{column.render(row, index)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? <EmptyState title={empty} /> : null}
    </div>
  );
}

export function Pagination({ total, page, onPage }: { total: number; page: number; onPage: (page: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / 8));
  return (
    <div className="mt-4 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <span>Hiển thị 8 dòng mỗi trang • Tổng {total} kết quả</span>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => onPage(Math.max(1, page - 1))}>Trước</Button>
        <span className="rounded-xl bg-white px-4 py-2 font-semibold text-ink ring-1 ring-gray-200">{page}/{pages}</span>
        <Button variant="secondary" onClick={() => onPage(Math.min(pages, page + 1))}>Sau</Button>
      </div>
    </div>
  );
}

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-muted hover:bg-gray-100" aria-label="Đóng"><X className="h-5 w-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-2xl">
      <CheckCircle2 className="h-5 w-5 text-green-300" />
      {message}
      <button onClick={onClose} className="ml-2 rounded p-1 hover:bg-white/10" aria-label="Đóng thông báo"><X className="h-4 w-4" /></button>
    </div>
  );
}

export function EmptyState({ title = "Chưa có dữ liệu", description = "Hãy thay đổi bộ lọc hoặc tạo dữ liệu mới để tiếp tục." }) {
  return (
    <div className="grid place-items-center p-8 text-center">
      <div className="rounded-full bg-brand-soft p-3 text-brand"><Search className="h-6 w-6" /></div>
      <p className="mt-3 font-semibold text-ink">{title}</p>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>
  );
}

export function FileUpload({ onPick, label = "Kéo thả file hoặc chọn từ máy tính" }: { onPick: (name: string) => void; label?: string }) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-200 bg-brand-soft p-8 text-center transition hover:border-brand">
      <UploadCloud className="mb-3 h-9 w-9 text-brand" />
      <span className="font-semibold text-ink">{label}</span>
      <span className="mt-1 text-sm text-muted">Hỗ trợ .xlsx, .xls, hình ảnh, audio hoặc video theo từng màn hình</span>
      <input type="file" className="hidden" onChange={(event) => onPick(event.target.files?.[0]?.name ?? "file-demo.xlsx")} />
    </label>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-ink">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const inputClass = "h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100";
export const textareaClass = "min-h-28 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100";
