const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const toFormData = (files = []) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  return formData;
};

const isExcelFile = (file) => {
  const allowedMimeTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
  return allowedMimeTypes.includes(file.type);
};

const isImageFile = (file) => {
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
  const fileName = file.name ?? '';
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
  return imageTypes.includes(file.type) && imageTypes.some((type) => type.includes(extension));
};

export { getBase64, toFormData, isExcelFile, isImageFile };
