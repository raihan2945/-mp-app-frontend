import { useState, useMemo } from "react";
import { Select, Spin} from "antd";
import debounce from "lodash/debounce";


const DebounceSelect = ({
  fetchOptions,
  refetch,
  setSearchKey,
  debounceTimeout = 500,
  ...props
}) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions(fetchOptions);
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={(value) => {
        debounceFetcher(value);
        setSearchKey(value);
        refetch();
      }}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={fetchOptions}
    />
  );
};

export default DebounceSelect;
