export type Status = "Đang diễn ra" | "Hoàn thành" | "Chưa bắt đầu" | "Quá hạn" | "Bản nháp";

export const books = [
  { id: "book-1", name: "Dế Mèn phiêu lưu ký", lexile: 620, chapters: ["Bài học đường đời đầu tiên", "Phiêu lưu cùng Dế Trũi", "Vượt qua vùng cỏ may"] },
  { id: "book-2", name: "Cô bé quàng khăn đỏ", lexile: 430, chapters: ["Lời dặn của mẹ", "Con đường trong rừng", "Bài học cảnh giác"] },
  { id: "book-3", name: "Đất rừng phương Nam", lexile: 780, chapters: ["Rừng tràm", "Theo chân chú Võ Tòng", "Chợ nổi miền Tây"] },
  { id: "book-4", name: "Cho tôi xin một vé đi tuổi thơ", lexile: 710, chapters: ["Những trò chơi cũ", "Bạn bè trong xóm", "Ký ức tuổi thơ"] },
  { id: "book-5", name: "Kính vạn hoa", lexile: 690, chapters: ["Lớp học vui nhộn", "Nhóm bạn thân", "Mùa hè đáng nhớ"] },
  { id: "book-6", name: "Hoàng tử bé", lexile: 740, chapters: ["Hành tinh nhỏ", "Bông hồng", "Con cáo và bí mật"] },
];

export const classes = ["3A1", "4A2", "5A1", "6A3", "7A2"];
export const skills = ["Từ vựng", "Suy luận", "Dự đoán", "Giải thích", "Truy xuất thông tin", "Trình tự hoặc tóm tắt"];
export const questionTypes = ["Đa lựa chọn", "Một lựa chọn", "Đúng / Sai", "Điền khuyết", "Kéo thả", "Sắp xếp theo thứ tự đúng"];

export const students = [
  "Nguyễn Minh Anh", "Trần Gia Bảo", "Lê Khánh Linh", "Phạm Đức Huy", "Võ Nhật Nam", "Đặng Hoài Thương",
  "Bùi Gia Hân", "Hoàng Quang Minh", "Đỗ Ngọc Mai", "Vũ Hải Đăng", "Phan Hà My", "Mai Tuấn Kiệt",
];

export const questions = Array.from({ length: 18 }, (_, index) => {
  const book = books[index % books.length];
  return {
    id: `Q${String(index + 1).padStart(3, "0")}`,
    content: [
      "Vì sao Dế Mèn ân hận sau bài học đường đời đầu tiên?",
      "Chi tiết nào cho thấy cô bé đã quên lời mẹ dặn?",
      "Nhân vật An cảm nhận thế nào khi đi qua rừng tràm?",
      "Tác giả gợi lại tuổi thơ qua hình ảnh nào nổi bật?",
      "Nhóm bạn trong Kính vạn hoa giải quyết mâu thuẫn ra sao?",
      "Bài học quan trọng mà con cáo nói với Hoàng tử bé là gì?",
    ][index % 6],
    type: questionTypes[index % questionTypes.length],
    book: book.name,
    chapter: book.chapters[index % book.chapters.length],
    skill: skills[index % skills.length],
    updatedAt: `0${(index % 8) + 1}/06/2026`,
    status: index % 5 === 0 ? "Bản nháp" : "Hoàn thành",
    difficulty: ["Dễ", "Trung bình", "Khó"][index % 3],
  };
});

export const questionSets = [
  { id: "BD001", name: "Đọc hiểu Dế Mèn - chương 1", book: books[0].name, chapter: "Bài học đường đời đầu tiên", count: 20, type: "Theo ma trận", creator: "Nguyễn Văn An", date: "01/06/2026", status: "Hoàn thành" as Status },
  { id: "BD002", name: "Văn hóa đọc lớp 5", book: books[4].name, chapter: "Nhiều chương", count: 25, type: "Ngẫu nhiên", creator: "Nguyễn Văn An", date: "03/06/2026", status: "Đang diễn ra" as Status },
  { id: "BD003", name: "Bộ đề hệ thống Lexile 600", book: "Nhiều sách", chapter: "Tổng hợp", count: 30, type: "Bộ đề hệ thống", creator: "Hệ thống", date: "05/06/2026", status: "Chưa bắt đầu" as Status },
  { id: "BD004", name: "Ôn tập Hoàng tử bé", book: books[5].name, chapter: "Con cáo và bí mật", count: 18, type: "Theo ma trận", creator: "Nguyễn Văn An", date: "08/06/2026", status: "Bản nháp" as Status },
];

export const activities = [
  { id: "A01", name: "Bài tập đọc hiểu Dế Mèn", className: "5A1", deadline: "14/06/2026", status: "Đang diễn ra" as Status, completion: 72 },
  { id: "A02", name: "Khảo sát văn hóa đọc tháng 6", className: "6A3", deadline: "18/06/2026", status: "Chưa bắt đầu" as Status, completion: 0 },
  { id: "A03", name: "Thử thách đọc Hoàng tử bé", className: "7A2", deadline: "10/06/2026", status: "Quá hạn" as Status, completion: 64 },
  { id: "A04", name: "Ôn tập truy xuất thông tin", className: "4A2", deadline: "20/06/2026", status: "Hoàn thành" as Status, completion: 96 },
];

export const readingTasks = [
  { name: "Đọc chương 1 Dế Mèn", book: books[0].name, className: "5A1", time: "10/06 - 16/06", progress: 68, status: "Đang diễn ra" as Status },
  { name: "Nhật ký đọc sách tuần 2", book: books[3].name, className: "6A3", time: "12/06 - 19/06", progress: 35, status: "Chưa bắt đầu" as Status },
  { name: "Tóm tắt Hoàng tử bé", book: books[5].name, className: "7A2", time: "01/06 - 08/06", progress: 91, status: "Hoàn thành" as Status },
];

export const results = students.map((student, index) => ({
  id: `R${index + 1}`,
  student,
  className: classes[index % classes.length],
  activity: activities[index % activities.length].name,
  score: 6.5 + (index % 4) * 0.8,
  correct: 13 + (index % 7),
  total: 20,
  time: `${18 + index} phút`,
  attempts: (index % 3) + 1,
  status: index % 4 === 0 ? "Chưa hoàn thành" : "Hoàn thành",
}));

export const monthlyReading = [
  { month: "T1", books: 48, lexile: 520 },
  { month: "T2", books: 62, lexile: 548 },
  { month: "T3", books: 78, lexile: 572 },
  { month: "T4", books: 83, lexile: 604 },
  { month: "T5", books: 105, lexile: 631 },
  { month: "T6", books: 126, lexile: 655 },
];

export const skillScores = skills.map((skill, index) => ({ skill, score: 64 + index * 5, count: 28 - index }));
export const completionData = [{ name: "Hoàn thành", value: 72 }, { name: "Chưa hoàn thành", value: 28 }];
