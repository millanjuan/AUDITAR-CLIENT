import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/logo.png";

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "#000000",
  },
  logo: {
    width: 400,
    height: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
    backgroundColor: "#F2F2F2",
    padding: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
  section: {
    marginBottom: 10,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
    backgroundColor: "#F2F2F2",
    padding: 10,
  },
  points: {
    listStyleType: "circle",
    marginLeft: 20,
  },
  point: {
    fontSize: 12,
    marginBottom: 5,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  text: {
    marginLeft: 20,
    fontSize: 12,
    fontWeight: 400,
  },
  statement: {
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 10,
    paddingVertical: 10,
  },
  recomendations: {
    fontSize: 12,
    color: "#D01C1C",
    marginLeft: 20,
  },

  observation: {
    marginBottom: 10,
  },
  observationSpan: {
    fontWeight: "bold",
    marginRight: 10,
  },
});

const InspectionPdf = ({ inspection }) => {
  return (
    <Document>
      <Page size="A4" style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image src={logo} style={styles.logo} />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Datos del comercio</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre del comercio:</Text>
            <Text style={styles.value}>{inspection.companyName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rubro:</Text>
            <Text style={styles.value}>{inspection.category.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>N° de habilitación:</Text>
            <Text style={styles.value}>{inspection.autorizationNumber}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Datos del titular</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre y apellido:</Text>
            <Text style={styles.value}>{inspection.fullname}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Domicilio del comercio:</Text>
            <Text style={styles.value}>{inspection.companyAddress}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tipo y número de documento:</Text>
            <Text style={styles.value}>{inspection.identity}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Datos de contacto</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Celular:</Text>
            <Text style={styles.value}>{inspection.cellphone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Correo electrónico:</Text>
            <Text style={styles.value}>{inspection.email}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Fecha y hora</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{inspection.inspectionDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hora:</Text>
            <Text style={styles.value}>{inspection.inspectionTime}</Text>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.mainContainer}>
        <View style={styles.section}>
          <Text style={styles.title}>Inspección</Text>
        </View>
        {inspection.category.form &&
          inspection.category.form.map((question, questionIndex) => (
            <View key={questionIndex} style={styles.questionContainer}>
              {question.pregunta && (
                <Text style={styles.question}>{question.pregunta}</Text>
              )}
              <div style={styles.buttonsContainer}>
                {question.respuestas &&
                  Array.isArray(question.respuestas) &&
                  question.respuestas.map(
                    (respuesta, answerIndex) =>
                      inspection.form.data[questionIndex].answer ===
                        answerIndex && (
                        <div key={answerIndex}>
                          <Text style={styles.statement}>
                            Respuesta: {respuesta}
                          </Text>
                        </div>
                      )
                  )}
              </div>
              {question.observacion && (
                <div style={styles.observation}>
                  <Text style={styles.statement}>{question.observacion}</Text>
                  <Text style={styles.text}>
                    {inspection.form.data[questionIndex].observation}
                  </Text>
                </div>
              )}
              {question.negative &&
                inspection.form.data[questionIndex]?.negative === true && (
                  <div style={styles.negative}>
                    <Text style={styles.statement}>Recomendaciones:</Text>
                    {question.negative.split("\n").map((paragraph, index) => (
                      <Text key={index} style={styles.recomendations}>
                        {paragraph}
                      </Text>
                    ))}
                  </div>
                )}
            </View>
          ))}
      </Page>
    </Document>
  );
};

export default InspectionPdf;
