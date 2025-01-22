import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to QuizVibe</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        <Text style={styles.listItem}>
          • Select a quiz from the side menu at the left.
        </Text>
        <Text style={styles.listItem}>
          • You can create a quiz by clicking on the{" "}
          <Text style={styles.highlight}>
            "Create Quiz"
          </Text>{" "}
          button.
        </Text>
        <Text style={styles.listItem}>
          • Wait for your quiz to be reviewed and then it will be made available
          for the public to see.
        </Text>
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    position: "absolute",
    width: "90%",
    height: "80%",
    alignSelf: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
    // transform: [{ translateX: -0.5 * 90 + "%" }, { translateY: -0.5 * 80 + "%" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 24,
    marginBottom: 20,
  },
  listContainer: {
    flexDirection: "column",
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 10,
  },
  listItem: {
    fontSize: 18,
    marginVertical: 5,
  },
  highlight: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
