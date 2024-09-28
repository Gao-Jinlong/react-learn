import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer
      ghost
      header={{
        title: '页面标题',
        ghost: true,
        breadcrumb: {
          items: [
            {
              path: '',
              title: '一级页面',
            },
            {
              path: '',
              title: '二级页面',
            },
            {
              path: '',
              title: '当前页面',
            },
          ],
        },
        extra: [
          <Button key="1">次要按钮</Button>,
          <Button key="2">次要按钮</Button>,
          <Button key="3" type="primary">
            主要按钮
          </Button>,
        ],
      }}
      tabBarExtraContent="测试tabBarExtraContent"
      tabList={[
        {
          tab: '基本信息',
          key: 'base',
          closable: false,
        },
        {
          tab: '详细信息',
          key: 'info',
        },
      ]}
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
      footer={[
        <Button key="3">重置</Button>,
        <Button key="2" type="primary">
          提交
        </Button>,
      ]}
    >
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
