import React from "react";
import ContactsView from "../../views/Contacts";

import { message } from "antd";

const Contacts = () => {
  const [messageApi, contextHolder] = message.useMessage();

  //* : MESSAGES
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message || "Success",
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message || "Error",
    });
  };

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message || "Warning",
    });
  };

  return (
    <div>
      {contextHolder}
      <ContactsView success={success} error={error}/>
    </div>
  );
};

export default Contacts;
