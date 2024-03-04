import React, { useEffect, useMemo, useRef, useState } from "react";
import specialityApi, {
  useGetAllServicesQuery,
  useGetAllSubSpecialityQuery,
} from "../../redux/features/speciality/specialityApi";
import debounce from "lodash/debounce";
import { Form, Select, Spin } from "antd";
import { useGetAllSpecialtyQuery } from "../../redux/features/speciality/specialityApi";
import { useQuery } from "@reduxjs/toolkit/query/react";
import DebounceSelect from "../shared/DebounceSelect";
import { useGetAllBrandsQuery } from "../../redux/features/products/productsApi";

const Core = ({ values, setValues, success, error, warning }) => {
  const [items, setItems] = useState([]);
  const [searchKey, setSearchKey] = useState();

  const { data: getData, refetch } = useGetAllBrandsQuery(searchKey);

  useEffect(() => {
    if (getData?.data) {
      const newArray =
        Array.isArray(getData?.data) &&
        getData?.data?.map((d) => {
          return {
            label: `${d.brand_code_text}`,
            value: d.brand_code_text,
          };
        });
      setItems(newArray);
    }
  }, [getData]);

  return (
    <Form.Item label="Core">
      <DebounceSelect
        mode="multiple"
        value={values}
        placeholder="Select brand"
        fetchOptions={items}
        onChange={(newValue) => {
          setValues(newValue);
        }}
        refetch={refetch}
        setSearchKey={setSearchKey}
        style={{
          width: "100%",
        }}
      />
    </Form.Item>
  );
};
export default Core;
