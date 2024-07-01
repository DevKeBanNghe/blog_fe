import { Card, Flex, Typography } from 'antd';
import momoDonate from '/momo_Donate.jpg';
import VTBDonate from '/VTB_Donate.jpg';
import { HeartTwoTone } from '@ant-design/icons';
const { Title } = Typography;

const Donates = () => {
  const donates = [
    {
      type: 'MOMO',
      image_url: momoDonate,
    },
    {
      type: 'VTB',
      image_url: VTBDonate,
    },
  ];

  return (
    <>
      <Title style={{ textAlign: 'center' }} level={3}>
        Sự ủng hộ của bạn là niềm động lực to lớn giúp mình ra mắt thêm những nội dung tâm huyết trong tương lai{' '}
        <HeartTwoTone twoToneColor={'#e20145'} />
      </Title>
      <Flex justify='center' align='center' gap={'large'} wrap='wrap'>
        {donates.map((donate) => (
          <Card key={donate.type} bordered={false}>
            <img width={'100%'} style={{ maxHeight: '32em' }} src={donate.image_url}></img>
          </Card>
        ))}
      </Flex>
    </>
  );
};
export default Donates;
