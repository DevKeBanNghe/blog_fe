import { Checkbox } from 'antd';

function ToggleColumnsView({ list = [], value = [], onChange = () => {} }) {
  const options = list.map(({ key, title }) => ({
    label: title,
    value: key ?? title,
  }));

  return <Checkbox.Group value={value} options={options} onChange={onChange} style={{ margin: '10px 0' }} />;
}

export default ToggleColumnsView;
