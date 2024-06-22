import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
const { confirm } = Modal;

const showConfirm = ({
  title,
  icon = () => {},
  content,
  okText,
  okType,
  cancelText,
  onOk = () => {},
  onCancel = () => {},
}) => {
  confirm({
    title,
    icon,
    content,
    okText,
    okType,
    cancelText,
    onOk,
    onCancel,
  });
};

export const showDeleteConfirm = ({ onOk = () => {}, onCancel = () => {}, ...props }) => {
  showConfirm({
    title: 'Are you sure delete this ?',
    icon: <ExclamationCircleFilled />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk,
    onCancel,
    ...props,
  });
};
