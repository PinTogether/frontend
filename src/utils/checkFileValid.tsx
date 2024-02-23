
const checkFileValid = (file: File): boolean => {
  const file_path = file.name;
  const reg = /(.*?)\.(jpg|jpeg|png)$/;

  // 허용되지 않은 확장자
  if (file_path === "" || !reg.test(file_path)) return false;

	// img 리사이즈
  // 5MB 사이즈 제한
	const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) return false;

  return true;
};

export default checkFileValid;
