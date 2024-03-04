import React, { useEffect, useState } from "react";
import Core from "../../components/brandItems/Core";
import { Button, Form } from "antd";
import Support from "../../components/brandItems/Support";
import Prospect from "../../components/brandItems/Prospect";
import {
  useAssignBrandMutation,
  useGetAllBrandsByDoctorQuery,
} from "../../redux/features/brand/brandApi";

const Brand = ({ doctor, success, error }) => {
  const [
    AssignBrand,
    { isSuccess: createSuccess, error: createError, stats: createStatus },
  ] = useAssignBrandMutation();
  const { data: getBrands } = useGetAllBrandsByDoctorQuery(doctor?.id);

  const [values, setValues] = useState([]);
  const [values1, setValues1] = useState([]);
  const [values2, setValues2] = useState([]);

  console.log("get brands is :", getBrands);

  const submit = () => {
    const data = {
      dr_id: doctor?.id,
      core: values.map((v) => v.value),
      support: values1.map((v) => v.value),
      prospect: values2.map((v) => v.value),
    };
    AssignBrand(data);
  };

  useEffect(() => {
    if (createError) {
      if (createError.status == 400) {
        createError.data.error.map((er) => {
          return error(er);
        });
      }
      if (createError.status == 500) {
        error("Server Error : 500");
      }
    }
    if (createSuccess) {
      success("Experience created successfully");
      // cancel();
      // refetch();
    }
  }, [createStatus, createSuccess, createError]);

  useEffect(() => {
    if (getBrands?.data) {
      const cores = getBrands?.data?.cores.map((v) => {
        return { label: v.core, value: v.core };
      });
      const supports = getBrands?.data?.supports.map((v) => {
        return { label: v?.support, value: v?.support };
      });
      const prospects = getBrands?.data?.prospects.map((v) => {
        return { label: v?.prospect, value: v?.prospect };
      });
      setValues(cores);
      setValues1(supports);
      setValues2(prospects);
      // console.log("cores is : ", supports)
    }
  }, [getBrands]);

  return (
    <div style={{ padding: "0rem .7rem" }}>
      <Core values={values} setValues={setValues} />
      <Support values={values1} setValues={setValues1} />
      <Prospect values={values2} setValues={setValues2} />
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() => {
            submit();
          }}
          type="primary"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Brand;
