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

  console.log('process.env: ', process.env);

  return (
    <PageContainer>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>

      <CountDisplay />
      <div className="m-2"></div>
      <IncrementCount />

      <div className="m-4"></div>

      <DataView />
    </PageContainer>
  );
};

export default HomePage;
