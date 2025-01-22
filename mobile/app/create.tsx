import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Alert 
} from "react-native";
import axios from "axios";

interface Answer {
  text: string;
  correct: boolean;
}

interface Question {
  question: string;
  picture?: string;
  answers: Answer[];
}

interface QuestionProps {
  index: number;
  questionData: Question;
  updateQuestion: (index: number, updatedQuestion: Question) => void;
  removeQuestion: (index: number) => void;
}

const create: React.FC = () => {
  const apiUrl = __DEV__
    ? 'http://localhost:8000'
    : 'https://general-knowledge-eta.vercel.app'

  const [category, setCategory] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", picture: "", answers: [] },
  ]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsPending(true);

    if (!category) {
      Alert.alert("Validation Error", "Please enter a quiz category");
      setIsPending(false);
      return;
    }

    if (questions.length < 2) {
      Alert.alert("Validation Error", "Every quiz should have at least 2 questions");
      setIsPending(false);
      return;
    }

    if (questions.some((question) => !question.question)) {
      Alert.alert("Validation Error", "Every question should have some text");
      setIsPending(false);
      return;
    }

    if (questions.some((question) => question.answers.length < 2)) {
      Alert.alert("Validation Error", "Every question should have at least 2 answers");
      setIsPending(false);
      return;
    }

    if (questions.some((question) => question.answers.every((answer) => !answer.correct))) {
      Alert.alert("Validation Error", "Every question should have 1 correct answer");
      setIsPending(false);
      return;
    }

    if (questions.some((question) => question.answers.every((answer) => answer.correct))) {
      Alert.alert("Validation Error", "Question answers cannot all be correct");
      setIsPending(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/quiz`, {
        category: category,
        quiz: questions,
      });
      Alert.alert("Success", response.data.message);
      setIsSubmitted(true);
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    } finally {
      setIsPending(false);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", picture: "", answers: [] },
    ]);
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => index !== i);
    setQuestions(updatedQuestions);
  };

  return (
    <View style={styles.container}>
      {!isSubmitted ? (
        <>
          <Text style={styles.title}>Create a Quiz</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter quiz category"
            value={category}
            onChangeText={setCategory}
          />
          <FlatList
            data={questions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Question
                index={index}
                questionData={item}
                updateQuestion={updateQuestion}
                removeQuestion={removeQuestion}
              />
            )}
          />
          <TouchableOpacity style={styles.button} onPress={addQuestion}>
            <Text style={styles.buttonText}>Add a Question</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isPending && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={isPending}
          >
            <Text style={styles.buttonText}>
              {isPending ? "Loading..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.thankYou}>
          Thank you! Your quiz has been submitted successfully!
        </Text>
      )}
    </View>
  );
};

const Question: React.FC<QuestionProps> = ({
  index,
  questionData,
  updateQuestion,
  removeQuestion,
}) => {
  const { question, picture, answers } = questionData;

  const handleQuestionChange = (text: string) => {
    updateQuestion(index, { ...questionData, question: text });
  };

  const handlePictureChange = (text: string) => {
    updateQuestion(index, { ...questionData, picture: text });
  };

  const addAnswer = () => {
    updateQuestion(index, {
      ...questionData,
      answers: [...answers, { text: "", correct: false }],
    });
  };

  const updateAnswer = (answerIndex: number, updatedAnswer: Answer) => {
    const updatedAnswers = answers.map((a, i) =>
      i === answerIndex ? updatedAnswer : a
    );
    updateQuestion(index, { ...questionData, answers: updatedAnswers });
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionTitle}>Question {index + 1}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the question"
        value={question}
        onChangeText={handleQuestionChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL (optional)"
        value={picture}
        onChangeText={handlePictureChange}
      />
      <FlatList
        data={answers}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index: answerIndex }) => (
          <View style={styles.answerContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter answer"
              value={item.text}
              onChangeText={(text) =>
                updateAnswer(answerIndex, { ...item, text })
              }
            />
            <Button
              title={item.correct ? "Correct" : "Mark Correct"}
              onPress={() =>
                updateAnswer(answerIndex, { ...item, correct: !item.correct })
              }
            />
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={addAnswer}>
        <Text style={styles.buttonText}>Add Answer</Text>
      </TouchableOpacity>
      {index > 0 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeQuestion(index)}
        >
          <Text style={styles.buttonText}>Remove Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingLeft: 20, paddingRight: 20, paddingTop: 80, paddingBottom: 20, flex: 1, backgroundColor: "#f0f0f0" },
  title: { fontSize: 24, textAlign: 'center', fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  disabledButton: { backgroundColor: "#ccc" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  questionContainer: { marginVertical: 20 },
  questionTitle: { fontSize: 18, fontWeight: "bold" },
  answerContainer: { flexDirection: "row", alignItems: "center" },
  removeButton: { backgroundColor: "red", padding: 10, borderRadius: 5 },
  thankYou: { textAlign: "center", fontSize: 18, marginVertical: 20 },
});

export default create;
