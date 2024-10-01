import { useRequest } from '@umijs/max';

const useData = () => {
  const {
    data,
    loading,
    error,
    run: handleLoad,
  } = useRequest(
    {
      url: 'api/data',
      method: 'GET',
    },
    {
      manual: true,
    },
  );
  return {
    data,
    loading,
    error,
    handleLoad,
  };
};

export default useData;
