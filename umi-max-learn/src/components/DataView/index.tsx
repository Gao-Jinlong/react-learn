import { useModel } from '@umijs/max';

export default function DataView() {
  const { handleLoad, data, error, loading } = useModel('data');

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        <div>
          <button type="button" onClick={handleLoad}>
            reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'no data'}
      <div>
        <button
          type="button"
          className="w-24 line-height-relaxed"
          onClick={handleLoad}
        >
          load data
        </button>
      </div>
    </div>
  );
}
