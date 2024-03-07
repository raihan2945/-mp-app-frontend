import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Page,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Text,
} from "@react-pdf/renderer";

// Your custom component with a <div> and CSS styles
const CustomContent = () => (
  <View style={customStyles.container}>
    <Text style={customStyles.heading}>Custom Content</Text>
    <Text style={customStyles.paragraph}>
      This is some custom content with CSS styles.
    </Text>
  </View>
);

// Component that will handle the printing
const PrintComponent = ({ contentRef }) => {
  return <div ref={contentRef} />;
};

// PDF Document component with custom page size and multiple pages
const PDFDocument = () => (
  <Document>
    {/* Render multiple pages with 8 components (2 columns x 4 rows) on each page */}
    {Array.from({ length: 3 }, (_, pageIndex) => (
      <Page
        key={pageIndex}
        size={{ width: 439.2, height: 590.4 }}
        style={styles.page}
      >
        <View style={styles.section}>
          {/* Render 8 components (2 columns x 4 rows) on each page */}
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {Array.from({ length: 2 }, (_, colIndex) => (
                <View key={colIndex} style={styles.column}>
                  {/* Use the CustomContent component */}
                  <CustomContent />
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    ))}
  </Document>
);

// PDF Viewer component
const PDFViewerComponent = () => (
  <PDFViewer width="100%" height="600px">
    <PDFDocument />
  </PDFViewer>
);

// Main component
const App = () => {
  const contentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  const handleDownloadPDF = () => {
    const filename = "custom-pdf-document.pdf";
    const blob = new Blob([<PDFDocument />], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div>
      {/* <button onClick={handlePrint}>Print</button>
      <button onClick={handleDownloadPDF}>Download as PDF</button> */}

      <PrintComponent contentRef={contentRef}>
        <CustomContent />
      </PrintComponent>

      <PDFViewerComponent />
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
    backgroundColor: "#ffffff",
    padding: "10px",
    border: "1px solid #000000",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "216pt",
    height: "143pt",
  },
  heading: {
    fontSize: "16px",
    color: "#333333",
    marginBottom: "5px",
  },
  paragraph: {
    fontSize: "12px",
    color: "#666666",
    lineHeight: "1.1",
  },
};

export default App;
