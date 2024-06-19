import { Image } from 'antd';
import { getBase64 } from 'common/utils/file.util';
import { forwardRef, useImperativeHandle, useState } from 'react';

function ImagePreviewRef(_, ref) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  useImperativeHandle(ref, () => ({
    onPreview: handlePreview,
  }));

  return (
    <>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}

const ImagePreview = forwardRef(ImagePreviewRef);

export default ImagePreview;
