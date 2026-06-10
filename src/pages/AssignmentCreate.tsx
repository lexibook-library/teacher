import { useMemo, useState } from "react";
import { Check, ChevronDown, Send } from "lucide-react";
import { classes, questionSets, students } from "../data/mockData";
import { Button, Card, Field, inputClass, PageHeader, textareaClass, Toast } from "../components/ui";

function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (items: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const display = selected.length ? selected.join(", ") : `Chọn ${label.toLowerCase()}`;

  function toggleOption(option: string) {
    onChange(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 text-left text-sm outline-none transition hover:border-brand focus:border-brand focus:ring-2 focus:ring-orange-100"
      >
        <span className={selected.length ? "truncate text-ink" : "truncate text-muted"}>{display}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-0 right-0 z-20 mt-2 max-h-64 overflow-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                type="button"
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${checked ? "bg-brand-soft font-semibold text-brand" : "text-ink hover:bg-gray-50"}`}
              >
                <span className={`grid h-5 w-5 place-items-center rounded-md border ${checked ? "border-brand bg-brand text-white" : "border-gray-300 bg-white"}`}>
                  {checked ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function AssignmentCreate() {
  const [scope, setScope] = useState("Lớp");
  const [selectedTargets, setSelectedTargets] = useState<string[]>(["5A1"]);
  const [toast, setToast] = useState("");

  const targetOptions = useMemo(() => {
    if (scope === "Cá nhân") return students;
    if (scope === "Trường") return ["Toàn trường"];
    return classes;
  }, [scope]);

  function handleScopeChange(value: string) {
    setScope(value);
    setSelectedTargets(value === "Cá nhân" ? [students[0]] : value === "Trường" ? ["Toàn trường"] : [classes[0]]);
  }

  return (
    <>
      <PageHeader title="Giao bộ câu hỏi" description="Tạo hoạt động kiểm tra, khảo sát hoặc cuộc thi đọc hiểu cho học sinh." />
      <Card className="max-w-5xl">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Chọn bộ đề">
            <select className={inputClass}>{questionSets.map((set) => <option key={set.id}>{set.name}</option>)}</select>
          </Field>
          <Field label="Loại hoạt động">
            <select className={inputClass}>
              <option>Bài tập về nhà</option>
              <option>Khảo sát</option>
              <option>Phát triển văn hóa đọc</option>
              <option>Cuộc thi</option>
            </select>
          </Field>
          <Field label="Thời gian bắt đầu"><input className={inputClass} type="datetime-local" /></Field>
          <Field label="Thời gian kết thúc"><input className={inputClass} type="datetime-local" /></Field>
          <Field label="Thời lượng làm bài"><input className={inputClass} defaultValue="30 phút" /></Field>
          <Field label="Số lần làm bài"><input className={inputClass} type="number" defaultValue={1} /></Field>
          <Field label="Phạm vi giao">
            <select className={inputClass} value={scope} onChange={(event) => handleScopeChange(event.target.value)}>
              <option>Trường</option>
              <option>Lớp</option>
              <option>Cá nhân</option>
            </select>
          </Field>
          <Field label={scope === "Cá nhân" ? "Chọn học sinh" : scope === "Trường" ? "Phạm vi áp dụng" : "Chọn lớp"}>
            <MultiSelectDropdown
              label={scope === "Cá nhân" ? "học sinh" : "lớp"}
              options={targetOptions}
              selected={selectedTargets}
              onChange={setSelectedTargets}
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Ghi chú cho học sinh">
            <textarea className={textareaClass} defaultValue="Hoàn thành trước hạn và đọc kỹ phần giải thích sau khi nộp bài." />
          </Field>
        </div>
        <label className="mt-4 flex items-center gap-3 rounded-xl bg-gray-50 p-3 text-sm font-semibold">
          <input type="checkbox" defaultChecked />
          Gửi thông báo tới học sinh
        </label>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setToast("Đã lưu nháp hoạt động")}>Lưu nháp</Button>
          <Button onClick={() => setToast("Đã giao hoạt động thành công")}><Send className="h-4 w-4" />Giao hoạt động</Button>
        </div>
      </Card>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
