import { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useFormContext } from 'react-hook-form';
import ImagePreview from './ImagePreview';

export default function ImageUpload() {
  const { setValue } = useFormContext();
  const imagePreviewRef = useRef();
  const MAX_QUANTITY_IMAGE_UPLOAD = 8;
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList: newFileList }) => {
    const typeImageValid = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    const newFileListData = newFileList.filter((file) => {
      if (file.url) {
        const fileUrl = file.url;
        const extensionFileName = fileUrl.slice(fileUrl.lastIndexOf('.') + 1);
        return typeImageValid.some((type) => type.includes(extensionFileName));
      }
      return typeImageValid.includes(file.type);
    });
    setFileList(newFileListData);
    setValue('file_list', newFileListData);
  };

  const onPreview = async (file) => await imagePreviewRef.current.onPreview(file);

  return (
    <>
      <Upload
        multiple={true}
        listType='picture-card'
        fileList={fileList}
        onPreview={onPreview}
        onChange={handleChange}
        beforeUpload={() => false}
      >
        {fileList.length >= MAX_QUANTITY_IMAGE_UPLOAD ? null : <PlusOutlined />}
      </Upload>
      <ImagePreview ref={imagePreviewRef} />
    </>
  );
}
