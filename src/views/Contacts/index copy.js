import React, { useEffect, useState, useRef } from "react";
import { Card, Table, Space, Tag, Button, Modal, Checkbox } from "antd";
import SearchBar from "./SearchBar";
import { useGetAllContactsQuery } from "../../redux/features/contacts/contactsApi";
import { FaPrint } from "react-icons/fa6";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import "./Print.css";

import { useReactToPrint } from "react-to-print";

const ContactsView = () => {
  const [searchItems, setSearchItems] = useState([]);
  const [isPrint, setPrint] = useState(null);
  const [contacts, setContacts] = useState([]);

  const componentRef = useRef();

  const PDFDocument = ({ content }) => (
    <Document>
      <Page size={{ width: 432, height: 576 }} style={styles.page}>
        <View style={styles.section}>
          <Text>{content}</Text>
        </View>
      </Page>
    </Document>
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = () => {
    const filename = "custom-pdf-document.pdf";
    const blob = new Blob([<PDFDocument content={componentRef.current} />], {
      type: "application/pdf",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const { data: getContacts, refetch } = useGetAllContactsQuery(searchItems);

  const totalPages = Math.ceil(Array.isArray(contacts) && contacts.length / 8);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Designation",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },

    {
      title: "Tag",
      key: "tag",
      dataIndex: "tag",
      //   render: (_, { tags }) => (
      //     <>
      //       {tags.map((tag) => {
      //         let color = tag.length > 5 ? "geekblue" : "green";
      //         if (tag === "loser") {
      //           color = "volcano";
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Divison",
      dataIndex: "division",
      key: "division",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Upazila",
      dataIndex: "upazila",
      key: "upazila",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Edit</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  useEffect(() => {
    setContacts(getContacts?.data);
  }, [getContacts]);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <SearchBar searchItems={searchItems} setSearchItems={setSearchItems} />
      <div style={{ textAlign: "end", marginTop: ".5rem" }}>
        <Button
          onClick={() => {
            setPrint(true);
            // handlePrint();
          }}
          type="primary"
          size="large"
        >
          <FaPrint size={18} />
          Print
        </Button>
      </div>
      <div style={{ marginTop: ".5rem" }}>
        <Table
          size="small"
          columns={columns}
          dataSource={contacts}
          scroll={true}
        />
      </div>

      <Modal
        open={isPrint}
        onCancel={() => {
          setPrint(false);
        }}
        footer={null}
        width={"auto"}
        centered
      >
        {/* <Card
          style={{
            marginBottom: ".5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Checkbox>Name</Checkbox>
          <Checkbox>Designation</Checkbox>
          <Checkbox>Mobile</Checkbox>
          <Checkbox>Email</Checkbox>
          <Checkbox>Address</Checkbox>
          <Checkbox>Tag</Checkbox>
          <Checkbox>Union/Pourosova</Checkbox>
          <Checkbox>Upazila</Checkbox>
          <Checkbox>District</Checkbox>
          <Checkbox>Division</Checkbox>
        </Card> */}
        <div className="print-container" ref={componentRef}>
          {Array.from({ length: totalPages }, (_, index) => (
            <div key={index} className="print-page" ref={componentRef}>
              <div className="print-content">
                {contacts.slice(index * 8, (index + 1) * 8).map((user, i) => (
                  <div className="print-item" key={i}>
                    <p style={{ fontSize: "1.2rem" }}>{user?.first_name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <PrintComponent contentRef={componentRef} />
        <PDFViewerComponent content={componentRef.current} />

        <Button
          onClick={handlePrint}
          type="primary"
          size="large"
          style={{ marginTop: "1rem" }}
        >
          <FaPrint size={18} />
          Print
        </Button>
      </Modal>
    </div>
  );
};

// Styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default ContactsView;
