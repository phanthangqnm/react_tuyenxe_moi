import { AxiosError } from 'axios';

// Kiểu dữ liệu trả về từ hàm errorException
export interface ExceptionResponse {
  status: number;
  message: string;
  data?: any;
  raw?: AxiosError;
}

// Hàm xử lý lỗi axios
export const errorException = (
  error: AxiosError,
  requestInfo: any = null
): ExceptionResponse => {
  let message = 'Đã xảy ra lỗi không xác định.';
  let status = 0;
  let data: any = null;

  if (error.response) {
    status = error.response.status;
    data = error.response.data;

    if (data?.message) {
      message = data.message;
    } else if (status === 401) {
      message = 'Bạn chưa đăng nhập hoặc phiên đã hết hạn.';
    } else if (status === 403) {
      message = 'Bạn không có quyền truy cập.';
    } else if (status === 404) {
      message = 'Không tìm thấy tài nguyên.';
    } else if (status === 500) {
      message = 'Lỗi máy chủ.';
    }
  } else if (error.request) {
    message = 'Không nhận được phản hồi từ máy chủ.';
  } else if (error.message) {
    message = error.message;
  }

  console.error('[Axios Error]', {
    status,
    message,
    error,
    requestInfo,
  });

  return {
    status,
    message,
    data,
    raw: error,
  };
};
