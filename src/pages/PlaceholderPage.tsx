import { Construction } from "lucide-react";
import { Card, PageHeader } from "../components/ui";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <>
      <PageHeader title={title} description="Khu vực này đã được gắn route để sẵn sàng mở rộng khi tích hợp nghiệp vụ tiếp theo." />
      <Card className="grid place-items-center p-12 text-center">
        <Construction className="h-12 w-12 text-brand" />
        <h2 className="mt-4 text-xl font-bold text-ink">Trang đang được chuẩn bị</h2>
        <p className="mt-2 max-w-lg text-sm text-muted">Các module chính của dashboard giáo viên đã có đầy đủ menu, dữ liệu demo và tương tác mẫu.</p>
      </Card>
    </>
  );
}
