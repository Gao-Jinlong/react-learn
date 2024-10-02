import { useModel } from '@umijs/max';

export default function IncrementCount() {
  const { increment } = useModel('counter', (model) => ({
    increment: model.increment,
  }));

  console.log('render: IncrementCount');

  return (
    <button
      className="w-24 bg-gradient-from-light line-height-relaxed
      "
      onClick={increment}
      type="button"
    >
      Count++
    </button>
  );
}
