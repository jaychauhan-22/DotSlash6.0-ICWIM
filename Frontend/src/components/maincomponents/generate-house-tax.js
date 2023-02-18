import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
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
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    }
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
                            <Text>
                            </Text>
                        </View>
                        <View style={styles.section}>
                            <Text>World</Text>
                        </View>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Product</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Type</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Period</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Price</Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>React-PDF</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>3 User </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>5€</Text>
                                </View>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>

        </div>
    );
}

export default GenerateHouseTax;
