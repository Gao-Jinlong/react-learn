import { useModel } from '@umijs/max';

export default function CountDisplay() {
  const { count } = useModel('counter');

  console.log('render: CountDisplay');

  return <p>Count: {count}</p>;
}
