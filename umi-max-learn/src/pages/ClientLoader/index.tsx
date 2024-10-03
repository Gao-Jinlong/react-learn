import { request, useClientLoaderData /* useRequest */ } from '@umijs/max';

export default function ClientLoader() {
  const { data } = useClientLoaderData();
  // const {data }= useRequest({
  //   url: '/api/data',
  //   method: 'GET',
  // })

  console.log('render: clientLoader');

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export async function clientLoader() {
  const data = await request('/api/data', { method: 'GET' });

  console.log('data');

  return { data };
}
