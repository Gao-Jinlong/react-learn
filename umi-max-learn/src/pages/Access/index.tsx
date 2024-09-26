import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess, useModel } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  const { setName } = useModel('global');

  function updateName() {
    setName(Math.random().toString(16).slice(2, 8));
  }

  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>

      <Button onClick={updateName}>update name</Button>
    </PageContainer>
  );
};

export default AccessPage;
