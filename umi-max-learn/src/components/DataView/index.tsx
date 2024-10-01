import { useModel } from '@umijs/max';

export default function DataView() {
  const { handleLoad, data, error, loading } = useModel('data');

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return (
      <div>
        <div>{JSON.stringify(error)}</div>
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
      {data ? <div>{JSON.stringify(data)}</div> : 'no data'}

      <div>
        <button type="button" onClick={handleLoad}>
          load data
        </button>
      </div>
    </div>
  );
}
