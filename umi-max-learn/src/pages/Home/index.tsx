import CountDisplay from '@/components/CountDisplay';
import DataView from '@/components/DataView';
import Guide from '@/components/Guide';
import IncrementCount from '@/components/IncrementCount';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');

  console.log('render: HomePage');

  return (
    <PageContainer>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>

      <CountDisplay />
      <IncrementCount />

      <DataView />
    </PageContainer>
  );
};

export default HomePage;
