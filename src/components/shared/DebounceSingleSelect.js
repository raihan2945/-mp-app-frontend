import { useState, useMemo } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";

const { Option } = Select;

const DebounceSingleSelect = ({
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

  // console.log("sub values is  : ", fetchOptions);

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
      // options={fetchOptions}
    >
      {fetchOptions?.map((option, index) => {
        return (
          <Option value={option.value}>
            <p style={{margin:0}}>{option.label}- {option.district}</p>
            <p style={{margin:0, fontSize:".7rem"}}>{option.subLabel}</p>
          </Option>
        );
      })}
    </Select>
  );
};

export default DebounceSingleSelect;
