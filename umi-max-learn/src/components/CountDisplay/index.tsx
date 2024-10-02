import { useModel } from '@umijs/max';
import styles from './index.less';

export default function CountDisplay() {
  const { count } = useModel('counter');

  console.log('render: CountDisplay');

  return <div className={styles.countView}>Count: {count}</div>;
}
