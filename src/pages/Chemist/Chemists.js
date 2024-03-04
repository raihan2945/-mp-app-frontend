import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Skeleton,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import FilterSection from "../../views/Filter/FilterSection";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetChemistsQuery,
  useUpdateChemistMutation,
} from "../../redux/features/chemist/chemistApi";

const Chemists = () => {
  const user = useSelector((state) => state?.user?.data);

  const [chemists, setChemists] = useState(null);

  const { data: getChemists, refetch } = useGetChemistsQuery(user?.work_area_t);

  useEffect(() => {
    if (getChemists?.data) {
      setChemists(getChemists?.data);
    }
  }, [getChemists]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {/* <FilterSection userType="chemist" /> */}
      <h5 style={{ color: "#3F51B5" }}>Chemists </h5>
      <div className="table-responsive">
        {chemists ? (
          chemists?.map((c) => {
            return (
              <NavLink to={`/chemists/${c?.id}`}>
                <Card style={{ padding: "0", marginBottom: "5px" }}>
                  <p style={{ margin: 0, fontWeight: "600", color: "#3F51B5" }}>
                    {c?.name1 || "Name"}
                  </p>
                  <Divider style={{ margin: "2px 0px" }} />
                  <p style={{ margin: 0 }}>Shop Owner : {c?.contact_person} </p>
                  <p style={{ margin: 0, fontSize: ".8rem", color: "gray" }}>
                    Address : {c?.street1} {c?.street1 && ","} {c?.street2}
                  </p>
                </Card>
              </NavLink>
            );
          })
        ) : (
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Chemists;
