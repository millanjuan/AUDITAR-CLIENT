import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import InspectionPdf from "../InspectionPdf/InspectionPdf";
import { useSelector } from "react-redux";

// Estilos compatibles con react-pdf
const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    padding: "20px",
  },
  // Otros estilos adaptados...
});

const PDFDocument = () => {
  const inspection = useSelector((state) => state.pdfData);
  return (
    <Document>
      <Page size="A4">
        <View style={styles.mainContainer}>
          <InspectionPdf inspection={inspection} />
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
