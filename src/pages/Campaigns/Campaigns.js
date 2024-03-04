import { Card, Divider } from "antd";
import { NavLink } from "react-router-dom";

const Campaigns = () => {
  const data = [
    {
      id: 1,
      campaign_name: "Campaign 1",
      campaign_type: "single",
      campaign_time: "2023-04-15",
      medium: "whatsapp",
      user_type: "mio",
      status: "active",
      stage: "running",
    },
    {
      id: 2,
      campaign_name: "Campaign 2",
      campaign_type: "daily",
      campaign_time: "2023-07-21",
      medium: "sms",
      user_type: "doctor",
      status: "inactive",
      stage: "draft",
    },
    {
      id: 3,
      campaign_name: "Campaign 3",
      campaign_type: "monthly",
      campaign_time: "2023-11-02",
      medium: "email",
      user_type: "chemist",
      status: "active",
      stage: "expired",
    },
    {
      id: 4,
      campaign_name: "Campaign 4",
      campaign_type: "yearly",
      campaign_time: "2023-08-17",
      medium: "whatsapp",
      user_type: "mio",
      status: "inactive",
      stage: "running",
    },
    {
      id: 5,
      campaign_name: "Campaign 5",
      campaign_type: "single",
      campaign_time: "2023-05-29",
      medium: "sms",
      user_type: "doctor",
      status: "active",
      stage: "draft",
    },
  ];
  return (
    <div>
       <h5 style={{color:"#3F51B5"}}>Chemists </h5>
         {data?.map((d) => {
          return (
            <NavLink to="/campaigns/details">

            <Card style={{padding:"0", marginBottom:"5px"}}>

              <p style={{margin:0, fontWeight:"600", color:"black"}}>#{d.id}</p>
              <p style={{margin:0, fontWeight:"600", color:"#3F51B5"}}>{d.campaign_name}</p>
              <Divider style={{margin:"2px 0px"}}/>
              <p style={{margin:0}}>Medium : {d.medium} </p>
              <p style={{margin:0, fontSize:".8rem", color:"gray"}}>User Type : {d.user_type}</p>
              <p style={{margin:0, fontSize:".8rem", color:"gray"}}>Status : {d.status}</p>
            </Card>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Campaigns;
