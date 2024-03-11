import React, { useEffect, useState, useRef } from "react";
import { Card, Table, Space, Tag, Button, Modal, Checkbox, Popconfirm } from "antd";
import SearchBar from "./SearchBar";
import {
  useDeleteContactMutation,
  useGetAllContactsQuery,
} from "../../redux/features/contacts/contactsApi";

//icons
import { IoMdAddCircle } from "react-icons/io";
import { FaPrint } from "react-icons/fa6";

import banlgaFont from "./fonts/Kalpurush-Regular.ttf";

import {
  Page,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Text,
  Font,
} from "@react-pdf/renderer";
import ContactForm from "./ContactForm";

Font.register({
  family: "Kalpurush",
  src: banlgaFont,
});

var finalEnglishToBanglaNumber = {
  0: "০",
  1: "১",
  2: "২",
  3: "৩",
  4: "৪",
  5: "৫",
  6: "৬",
  7: "৭",
  8: "৮",
  9: "৯",
};

String.prototype.getDigitBanglaFromEnglish = function () {
  var retStr = this;
  for (var x in finalEnglishToBanglaNumber) {
    retStr = retStr.replace(new RegExp(x, "g"), finalEnglishToBanglaNumber[x]);
  }
  return retStr;
};

// Your custom component with a <div> and CSS styles
const CustomContent = ({ data, checkingContent }) => (
  <View style={customStyles.container}>
    <Text style={customStyles.heading1}>
      {checkingContent?.first_name &&
        data.first_name &&
        `${data?.first_name}  `}
    </Text>
    <Text style={customStyles.heading}>
      {checkingContent?.last_name && data?.last_name && `${data?.last_name} `}
    </Text>

    <Text style={customStyles.paragraph}>
      {checkingContent.mobile &&
        data?.mobile &&
        `0${data.mobile}`.getDigitBanglaFromEnglish()}
    </Text>
    <Text style={customStyles.paragraph}>
      {checkingContent?.email && data?.email && `${data?.email} `}
    </Text>

    <Text style={customStyles.paragraph}>
      {checkingContent?.tag && data?.tag && `${data?.tag} `}
    </Text>

    <Text style={customStyles.paragraph}>
      {checkingContent?.union && data?.union && `${data?.union} ,`}
      {checkingContent?.upazila && data?.upazila && `${data?.upazila} `}
    </Text>

    <Text style={customStyles.paragraph}>
      {checkingContent?.district && data?.district && `${data?.district}`}{" "}
      {checkingContent?.division && data?.division && `, ${data?.division} `}
    </Text>
  </View>
);
// Your custom component with a <div> and CSS styles
// const CustomContent = ({ data, checkingContent }) => (
//   <View style={customStyles.container}>
//     <Text style={customStyles.heading1}>
//       {checkingContent?.first_name &&
//         data.first_name &&
//         `${data?.first_name} -`}
//     </Text>
//     <Text style={customStyles.heading}>
//       {checkingContent?.last_name && data?.last_name && `${data?.last_name} `}
//     </Text>
//     {data?.mobile && checkingContent?.mobile && (
//       <View
//         style={{ borderTop: "0.5px solid #EFF0F2", margin: "5px 0px" }}
//       ></View>
//     )}
//     <Text style={customStyles.paragraph}>
//       {checkingContent.mobile &&
//         data?.mobile &&
//         `0${data.mobile}`.getDigitBanglaFromEnglish()}
//     </Text>
//     <Text style={customStyles.paragraph}>
//       {checkingContent?.email && data?.email && `${data?.email} `}
//     </Text>
//     {checkingContent?.tag && data?.tag && (
//       <View>
//         <View
//           style={{ borderTop: "0.5px solid #EFF0F2", margin: "5px 0px" }}
//         ></View>
//         <Text style={customStyles.paragraph}>
//           {checkingContent?.tag && data?.tag && `${data?.tag} `}
//         </Text>
//       </View>
//     )}
//     {(data?.union || data?.upazila || data?.district || data?.division) && (
//       <View
//         style={{ borderTop: "0.5px solid #EFF0F2", margin: "5px 0px" }}
//       ></View>
//     )}
//     <Text style={customStyles.paragraph}>
//       {checkingContent?.union && data?.union && `${data?.union} ,`}{" "}
//       {checkingContent?.upazila && data?.upazila && `${data?.upazila} `}
//     </Text>
//     <Text style={customStyles.paragraph}>
//       {checkingContent?.district && data?.district && `${data?.district}`}{" "}
//       {checkingContent?.division && data?.division && `, ${data?.division} `}
//     </Text>
//   </View>
// );

// PDF Document component with custom page size and multiple pages
const PDFDocument = ({ dataArray, checkingContent }) => (
  <Document>
    {/* Map the array and create pages with 8 components on each page */}
    {Array.from({ length: Math.ceil(dataArray.length / 8) }, (_, pageIndex) => (
      <Page
        key={pageIndex}
        size={{ width: 439.2, height: 590.4 }}
        style={styles.page}
      >
        <View style={styles.section}>
          {/* Render 8 components on each page */}
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Array.from({ length: 2 }, (_, colIndex) => {
                const itemIndex = pageIndex * 8 + rowIndex * 2 + colIndex;
                return itemIndex < dataArray.length ? (
                  <View key={colIndex} style={styles.column}>
                    {/* Use the CustomContent component with the corresponding data */}
                    <CustomContent
                      data={dataArray[itemIndex]}
                      checkingContent={checkingContent}
                    />
                  </View>
                ) : null;
              })}
            </View>
          ))}
        </View>
      </Page>
    ))}
  </Document>
);

// PDF Viewer component
const PDFViewerComponent = ({ dataArray, checkingContent }) => (
  <PDFViewer width="100%" height="600px">
    <PDFDocument dataArray={dataArray} checkingContent={checkingContent} />
  </PDFViewer>
);

const ContactsView = ({ success, error }) => {
  const [searchItems, setSearchItems] = useState([]);
  const [isPrint, setPrint] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [createContact, setCreateContact] = useState(false);
  const [editContact, setEditContact] = useState(null);

  const [
    deleteContact,
    { error: deleteError, status: deleteStatus, isSuccess: deleteSucces },
  ] = useDeleteContactMutation();

  const cancelContactFormModal = () => {
    setCreateContact(false);
    setEditContact(false);
  };

  const [checkingContent, setCheckingContent] = useState({
    first_name: true,
    last_name: true,
    mobile: true,
    email: true,
    address: true,
    union: true,
    upazila: true,
    district: true,
    division: true,
    tag: true,
  });

  const { data: getContacts, refetch } = useGetAllContactsQuery(searchItems);

  useEffect(() => {
    if (deleteError) {
      if (deleteError.status == 400) {
        deleteError.data.error.map((er) => {
          return error(er);
        });
      }
      if (deleteError.status == 500) {
        error("Server Error : 500");
      }
    }
    if (deleteSucces) {
      success("Contact deleted successfully");
      refetch();
    }
  }, [deleteStatus, deleteSucces, deleteError]);

  useEffect(() => {
    setContacts(getContacts?.data);
  }, [getContacts]);

  useEffect(() => {
    refetch();
  }, []);

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => setEditContact(record)}
            type="primary"
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={()=>deleteContact(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <SearchBar searchItems={searchItems} setSearchItems={setSearchItems} />
      <div
        style={{
          marginTop: ".5rem",
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
        }}
      >
        <Button
          onClick={() => {
            setCreateContact(true);
          }}
          type="primary"
          size="large"
          style={{ backgroundColor: "#EF9B0F", border: "none" }}
        >
          <IoMdAddCircle size={18} />
          Create New
        </Button>
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
          scroll={{ x: true }}
        />
      </div>

      <Modal
        open={isPrint}
        onCancel={() => {
          setPrint(false);
        }}
        footer={null}
        width={"50%"}
        centered
      >
        <Card
          style={{
            marginBottom: ".5rem",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            <Tag>
              <Checkbox
                checked={checkingContent.first_name}
                onChange={(e) => {
                  const checkedValue = e.target.checked;
                  let obj = { ...checkingContent };
                  if (checkedValue) {
                    obj.first_name = true;
                    setCheckingContent(obj);
                  } else {
                    obj.first_name = false;
                    setCheckingContent(obj);
                  }
                }}
              >
                Name
              </Checkbox>
            </Tag>
            <Tag>
              <Checkbox
                checked={checkingContent.last_name}
                onChange={(e) => {
                  const checkedValue = e.target.checked;
                  let obj = { ...checkingContent };
                  if (checkedValue) {
                    obj.last_name = true;
                    setCheckingContent(obj);
                  } else {
                    obj.last_name = false;
                    setCheckingContent(obj);
                  }
                }}
              >
                Designation
              </Checkbox>
            </Tag>
            <Tag>
              <Checkbox
                checked={checkingContent.mobile}
                onChange={(e) => {
                  const checkedValue = e.target.checked;

                  let obj = { ...checkingContent };
                  if (checkedValue) {
                    obj.mobile = true;
                    setCheckingContent(obj);
                  } else {
                    obj.mobile = false;
                    setCheckingContent(obj);
                  }
                }}
              >
                Mobile
              </Checkbox>
            </Tag>
            <Tag>
              <Checkbox
                checked={checkingContent.email}
                onChange={(e) => {
                  const checkedValue = e.target.checked;

                  let obj = { ...checkingContent };
                  if (checkedValue) {
                    obj.email = true;
                    setCheckingContent(obj);
                  } else {
                    obj.email = false;
                    setCheckingContent(obj);
                  }
                }}
              >
                Email
              </Checkbox>
            </Tag>
            <Tag>
              <Checkbox
                checked={checkingContent.address}
                onChange={(e) => {
                  const checkedValue = e.target.checked;

                  let obj = { ...checkingContent };
                  if (checkedValue) {
                    obj.address = true;
                    setCheckingContent(obj);
                  } else {
                    obj.address = false;
                    setCheckingContent(obj);
                  }
                }}
              >
                Address
              </Checkbox>
            </Tag>
            <Tag>
              <Checkbox
                checked={checkingContent.tag}
                onChange={(e) => {
                  const checkedValue = e.target.checked;

                  let obj = { ...checkingContent };
                  if (checkedValue) {
                    obj.tag = true;
                    setCheckingContent(obj);
                  } else {
                    obj.tag = false;
                    setCheckingContent(obj);
                  }
                }}
              >
                Tag
              </Checkbox>
            </Tag>
            <Tag>
              <Checkbox
                checked={checkingContent.union}
                onChange={(e) => {
                  const checkedValue = e.target.checked;

                  let obj = { ...checkingContent };
                  if (checkedValue) {
                    obj.union = true;
                    setCheckingContent(obj);
                  } else {
                    obj.union = false;
                    setCheckingContent(obj);
                  }
                }}
              >
                Union/Pourosova
              </Checkbox>
            </Tag>
            <Tag>
              <Checkbox
                checked={checkingContent.upazila}
                onChange={(e) => {
                  const checkedValue = e.target.checked;

                  let obj = { ...checkingContent };
                  if (checkedValue) {
                    obj.upazila = true;
                    setCheckingContent(obj);
                  } else {
                    obj.upazila = false;
                    setCheckingContent(obj);
                  }
                }}
              >
                Upazila
              </Checkbox>
            </Tag>
            <Tag>
              <Checkbox
                checked={checkingContent.district}
                onChange={(e) => {
                  const checkedValue = e.target.checked;

                  let obj = { ...checkingContent };
                  if (checkedValue) {
                    obj.district = true;
                    setCheckingContent(obj);
                  } else {
                    obj.district = false;
                    setCheckingContent(obj);
                  }
                }}
              >
                District
              </Checkbox>
            </Tag>
            <Tag>
              <Checkbox
                checked={checkingContent.division}
                onChange={(e) => {
                  const checkedValue = e.target.checked;

                  let obj = { ...checkingContent };
                  if (checkedValue) {
                    obj.division = true;
                    setCheckingContent(obj);
                  } else {
                    obj.division = false;
                    setCheckingContent(obj);
                  }
                }}
              >
                Division
              </Checkbox>
            </Tag>
          </div>
        </Card>

        {/* <PrintComponent contentRef={contentRef}>
                   {contacts?.slice(index * 8, (index + 1) * 8).map((data, index) => (
            <CustomContent key={index} data={data} />
          ))}
        </PrintComponent> */}
        <PDFViewerComponent
          dataArray={contacts}
          checkingContent={checkingContent}
        />
      </Modal>

      <Modal
        open={createContact || editContact}
        onCancel={() => cancelContactFormModal()}
        width={"70%"}
        footer={null}
      >
        <ContactForm
          success={success}
          error={error}
          editContact={editContact}
          cancel={cancelContactFormModal}
          createContact={createContact}
        />
      </Modal>
    </div>
  );
};

// Styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    // margin: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
    margin: 2,
  },
});

// Custom styles for the CustomContent component
const customStyles = {
  container: {
    // backgroundColor: "#ffffff",
    padding: "15px",
    // border: "1px solid #F2F2F2",
    borderRadius: "8px",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "216pt",
    height: "143pt",
  },
  heading1: {
    fontSize: "14px",
    color: "#333333",
    fontFamily: "Kalpurush",
    margin: 0,
    // width:"max-content"
  },
  heading: {
    fontSize: "12px",
    color: "#333333",
    fontFamily: "Kalpurush",
    // width:"max-content"
    // lineHeight:1.1,
    margin: 0,
  },
  paragraph: {
    fontSize: "12px",
    color: "#666666",
    lineHeight: "1.1",
    fontFamily: "Kalpurush",
    marginBottom: "5px",
  },
};

export default ContactsView;
