import useSWR from "swr";
import fetcher from "../lib/fetcher";

//swr tương tự như react query, tự động fetch data khi data thay đổi, ko cần redux
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
