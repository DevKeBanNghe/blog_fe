import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useFormContext } from 'react-hook-form';
import ImagePreview from './ImagePreview';
import { convertToField, removeURLParams } from 'common/utils/common.util';
import { isObject } from 'lodash';
import { toast } from 'common/utils';
import ExcelJS from 'exceljs';
import axios from 'axios';
import { isExcelFile, isImageFile } from 'common/utils/file.util';

export default function ImageUpload() {
  const { setValue } = useFormContext();
  const imagePreviewRef = useRef();
  const MAX_QUANTITY_IMAGE_UPLOAD = 8;
  const [fileList, setFileList] = useState([]);

  const handleUploadExcelImages = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      const workbook = new ExcelJS.Workbook();
      reader.onload = async (e) => {
        try {
          await workbook.xlsx.load(e.target.result);
          for (const worksheet of workbook.worksheets) {
            const data = {};
            const fields = [];
            worksheet.eachRow((row, rowNumber) => {
              row.eachCell((cell, colNumber) => {
                const value = cell.value;
                if (rowNumber === 1) {
                  if (!value) return;
                  const field = convertToField(value);
                  fields.push(field);
                  return;
                }
                const imageUrl = removeURLParams(isObject(value) ? value.hyperlink : value);
                const field = fields[colNumber - 1];
                if (!field) return;
                const dataExist = data[field];
                if (!dataExist) {
                  data[field] = [imageUrl];
                  return;
                }
                const isValueExist = dataExist.find((item) => item === imageUrl);
                if (isValueExist) return;
                data[field].push(imageUrl);
              });
            });

            const files = [];
            for (const field of fields) {
              for (const value of data[field]) {
                if (field === 'image_url') {
                  const res = await axios.get(value, { responseType: 'blob' });
                  const blob = res.data;
                  const fileName = value.slice(value.lastIndexOf('/') + 1);
                  const file = new File([blob], fileName, { type: blob.type });
                  files.push({ originFileObj: file });
                }
              }
            }
            resolve(files);
          }
        } catch (error) {
          reject(error);
          toast.error('Error read file');
          console.error('Error read file:', error);
        }
      };
      reader.readAsArrayBuffer(file);
    });

  const handleChange = async ({ fileList }) => {
    const data = [];
    for (const fileInfo of fileList) {
      const originFileObj = fileInfo.originFileObj;
      if (isImageFile(originFileObj)) {
        data.push(fileInfo);
        continue;
      }
      if (isExcelFile(originFileObj)) {
        const imageFiles = await handleUploadExcelImages(originFileObj);
        data.push(...imageFiles);
      }
    }
    setFileList(data);
  };

  useEffect(() => {
    setValue('file_list', fileList);
  }, [fileList]);

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
