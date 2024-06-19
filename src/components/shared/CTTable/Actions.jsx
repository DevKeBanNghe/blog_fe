import CTIcon from '../CTIcon';
import { Flex } from 'antd';
import CheckPermission from '../CheckPermission';
import useCurrentPage from 'hooks/useCurrentPage';
import { useNavigate } from 'react-router-dom';
import { DeleteTwoTone, EyeTwoTone, EditTwoTone, CopyTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';

export default function Actions({ actions = [], onGlobalDelete, dataRecord }) {
  const { currentRoute, queryParamsString } = useCurrentPage({ isPaging: false });
  const navigate = useNavigate();
  const [tableActions, setTableActions] = useState(actions);

  useEffect(() => {
    const actionsDefault = {
      copy: {
        icon: CopyTwoTone,
        twoToneColor: '#00a67d',
        disabled: true,
        onClick: ({ row_id }) => navigate(`${currentRoute}/copy/${row_id}${queryParamsString}`),
      },
      edit: {
        icon: EditTwoTone,
        twoToneColor: '#cb8d00',
        disabled: true,
        onClick: ({ row_id }) => navigate(`${currentRoute}/edit/${row_id}${queryParamsString}`),
      },
      view: {
        icon: EyeTwoTone,
        disabled: true,
        onClick: ({ row_id }) => navigate(`${currentRoute}/${row_id}${queryParamsString}`),
      },
      delete: {
        icon: DeleteTwoTone,
        twoToneColor: '#e20145',
        disabled: true,
        onClick: ({ row_id }) => onGlobalDelete([row_id]),
      },
    };
    for (const action of actions) {
      if (!action.type) continue;
      actionsDefault[action.type] = {
        ...actionsDefault[action.type],
        disabled: false,
        ...action,
      };
    }
    setTableActions((prev) => [...Object.values(actionsDefault), ...prev]);
  }, []);

  return (
    <Flex gap='middle' justify='center' wrap='wrap'>
      {tableActions.map(({ onClick, permission_key, disabled = false, ...item }, index) => (
        <CheckPermission key={`social_icon_${index}`} permission_keys={permission_key}>
          <CTIcon onClick={() => !disabled && onClick(dataRecord)} style={{ fontSize: '22px' }} {...item} />
        </CheckPermission>
      ))}
    </Flex>
  );
}
