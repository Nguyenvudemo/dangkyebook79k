// =========================================================================
// CẤU HÌNH LIÊN KẾT GOOGLE SHEET & BỘ SƯU TẬP ẢNH LANDING PAGE TRỰC TIẾP
// =========================================================================

/**
 * 1. ĐƯỜNG DẪN WEBHOOK GOOGLE SHEET
 * Hãy dán đường dẫn Web App URL lấy từ Google Apps Script (bước triển khai) vào đây.
 * Ví dụ: "https://script.google.com/macros/s/AKfycb.../exec"
 */
export const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzoGhT92wvJJNFJSH2cn1MmEji-980Q-EElYj1Iu8AbZJCU68rwcS2LYocbgVR5ORQ/exec";


/**
 * 2. DANH SÁCH HÌNH ẢNH BỘ SƯU TẬP LADIPAGE AI
 * Bạn có thể thay thế các link ảnh dưới đây một cách dễ dàng:
 * 
 * CÁCH 1: Dùng link ảnh online (ví dụ link từ Facebook, Unsplash, Imgur, hosting của bạn):
 *         imageUrl: "https://ten_mien_cua_ban.com/hinh-anh.jpg"
 * 
 * CÁCH 2: Dùng ảnh lưu trong code (Khi bạn tải code về hoặc đẩy lên GitHub):
 *         - Bước 1: Hãy tạo thư mục tên là "images" bên trong thư mục "public" (đường dẫn: /public/images/)
 *         - Bước 2: Bỏ các file ảnh của bạn vào thư mục đó (ví dụ: my_cosmetics.jpg)
 *         - Bước 3: Đổi đường dẫn imageUrl dưới đây thành đường dẫn tương đối:
 *         imageUrl: "/images/my_cosmetics.jpg"
 */
export interface LadiItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export const DEFAULT_LADI_COLLECTION: LadiItem[] = [
  {
    id: 'ladi-1',
    title: 'Landing Page Mỹ Phẩm Vegan',
    category: 'Mỹ Phẩm & Làm Đẹp',
    imageUrl: 'images/dacsan.png'
  },
  {
    id: 'ladi-2',
    title: 'Landing Page Cà Phê Specialty',
    category: 'F&B - Trà sữa & Cà phê',
    imageUrl: 'images/greenmotion_ev.jpg'
  },
  {
    id: 'ladi-3',
    title: 'Landing Page Thiết Bị Công Nghệ',
    category: 'SaaS & Tech Gadget',
    imageUrl: 'images/dac_san_binh_dinh.png'
  },
  {
    id: 'ladi-4',
    title: 'Landing Page Thời Trang Minimalist',
    category: 'Thời Trang Cao Cấp',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'ladi-5',
    title: 'Landing Page Khóa Học Tiếng Anh',
    category: 'Giáo Dục & EdTech',
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'ladi-6',
    title: 'Landing Page Thiết Kế Nội Thất',
    category: 'Kiến Trúc & Đồ Gia Dụng',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'ladi-7',
    title: 'Landing Page Gym & Thể Hình',
    category: 'Sức Khỏe & Fitness',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'ladi-8',
    title: 'Landing Page Khách Sạn & Resort',
    category: 'Du Lịch & Nghỉ Dưỡng',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'ladi-9',
    title: 'Landing Page Spa & Chăm Sóc Da',
    category: 'Dịch Vụ Trị Liệu',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80'
  }
];
