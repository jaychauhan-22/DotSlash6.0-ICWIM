import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  centertext: {
    textAlign: "center"
  },
  page: {
    backgroundColor: "white",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  table: {
    margin: "0 auto",
    display: "table",
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});
const GenerateHouseTax = () => {
  return (
    <div>
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}
        <Document>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.centertext}>INITIATIVE TO CONVERT WASTE INTO MONEY</Text>
            </View>
            <View style={styles.section}>
              <Text style={{ margin: "5px 70px" }}>Name: Jay Chauhan</Text>
              <Text style={{ margin: "5px 70px" }}>Property Id: 132456</Text>
              <Text style={{ margin: "5px 70px" }}>Ward No: 3</Text>
              <Text style={{ margin: "5px 70px" }}>Email: jay189.chauhan@gmail.com</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Type</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Prev. Remaining</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Paid</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>General Tax</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>250</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>950</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>General Water Tax</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>1500 </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>2000</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Warrant Fees</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>0</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>750</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Interrest Charges</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>200</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>750</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Total Tax</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>1950</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>4450</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Money Earned from Waste</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>0</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>-750</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Final Tax to pay</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>0</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>3700</Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default GenerateHouseTax;
