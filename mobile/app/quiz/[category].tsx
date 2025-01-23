import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

type question = {
  question: string;
  picture: string;
  answers: [];
  category: string;
  quiz: [{ question: string; answers: []; picture: string }];
};

const quiz: React.FC = () => {
  const { category } = useLocalSearchParams();
  const apiUrl = __DEV__
    ? "http://localhost:8000"
    : "https://general-knowledge-eta.vercel.app";
  const [gameStarted, setGameStarted] = useState(false);
  const [displayResult, setDisplayResult] = useState(true);
  const [questions, setQuestions] = useState<question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextButton, setNextButton] = useState(false);
  const [answerScore, setAnswerScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(15);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${apiUrl}/${category}`)
        .then((response: any) => {
          document.title = `QuizVibe - ${response.data.questions[0].category} Quiz`;
          setQuestions(response.data.questions);
        })
        .catch((error) => {
          router.push("/");
          console.error("Error: ", error);
          Alert.alert(error.response.data?.message || error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, [apiUrl, category, router]);

  const setNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const runTimer = () => {
    if (timer < 0) {
      setTimer(15);
      return;
    }

    setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  };

  const startGame = () => {
    setGameStarted(true);
    setNextButton(true);
    setCurrentQuestionIndex(0);
    runTimer();
  };

  const selectAnswer = useCallback(
    (correct: boolean, questionLength: any) => {
      setNextQuestion();
      setTimer(15);
      if (correct) {
        setAnswerScore((prev) => prev + 1);
      }

      if (currentQuestionIndex === questionLength - 1) {
        setDisplayResult(true);
      }
    },
    [currentQuestionIndex]
  );

  useEffect(() => {
    if (timer < 0) {
      selectAnswer(false, questions[0].quiz.length);
      setTimer(15);
    }
  }, [questions, timer, currentQuestionIndex, selectAnswer]);

  const reloadScreen = () => {
    setCurrentQuestionIndex(0);
    setTimer(15);
  };

  return (
    <>
      {isLoading && (
        <SafeAreaView
          style={{
            backgroundColor: "rgb(68, 0, 102)",
            height: "100%",
            width: "100%",
          }}
        >
          <View style={styles.loading}></View>
        </SafeAreaView>
      )}
      {!isLoading && (
        <SafeAreaView
          style={{
            backgroundColor: "rgb(68, 0, 102)",
            height: "100%",
            width: "100%",
          }}
        >
          {gameStarted && (
            <>
              {currentQuestionIndex < questions[0].quiz.length && (
                <>
                  <View
                    style={{
                      position: "absolute",
                      top: 25,
                      right: "5%",
                      backgroundColor: "yellow",
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      borderRadius: 6,
                      display: displayResult ? "flex" : "none",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{ color: "black", fontWeight: "bold" }}
                    >{`Score: ${answerScore}${
                      currentQuestionIndex >= questions[0].quiz.length
                        ? `/${questions[0].quiz.length}`
                        : ""
                    }`}</Text>
                  </View>
                </>
              )}
            </>
          )}
          <ScrollView style={styles.container}>
            {gameStarted && (
              <>
                <View>
                  {questions[0].quiz.length > 0 && (
                    <>
                      {currentQuestionIndex < questions[0].quiz.length && (
                        <>
                          <View style={styles.questionInfoArea}>
                            <Text style={styles.questionInfoAreaHeading}>
                              Question {currentQuestionIndex + 1} of{" "}
                              {questions[0].quiz.length}
                            </Text>
                            <View
                              style={{
                                backgroundColor: timer <= 3 ? "red" : "green",
                                paddingVertical: 8,
                                paddingHorizontal: 20,
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 19.2,
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {timer < 10 ? "0" : ""}
                                {timer}
                              </Text>
                            </View>
                            {nextButton && (
                              <Pressable
                                style={[
                                  styles.btn,
                                  { width: "100%", maxWidth: 500 },
                                ]}
                                onPress={() =>
                                  selectAnswer(false, questions[0].quiz.length)
                                }
                              >
                                <Text
                                  style={{
                                    fontSize: 24,
                                    color: "white",
                                    textAlign: "center",
                                  }}
                                >
                                  Next
                                </Text>
                              </Pressable>
                            )}
                          </View>
                          <Image
                            style={{
                              width: "100%",
                              maxWidth: 500,
                              marginHorizontal: "auto",
                              objectFit: "contain",
                              height: 192,
                              borderRadius: 10,
                            }}
                            source={{
                              uri: questions[0].quiz[currentQuestionIndex]
                                ?.picture,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 20,
                              marginTop: 10,
                              textAlign: "center",
                              width: "100%",
                              maxWidth: 500,
                              marginHorizontal: "auto",
                            }}
                          >
                            {questions[0].quiz[currentQuestionIndex]?.question}
                          </Text>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              gap: 10,
                              marginVertical: 20,
                              width: "100%",
                              maxWidth: 500,
                              marginHorizontal: "auto",
                            }}
                          >
                            {questions[0].quiz[
                              currentQuestionIndex
                            ]?.answers?.map(
                              (
                                answer: { correct: boolean; text: string },
                                index: number
                              ) => (
                                <Pressable
                                  style={styles.btn}
                                  key={index}
                                  onPress={() =>
                                    selectAnswer(
                                      answer.correct,
                                      questions[0].quiz.length
                                    )
                                  }
                                >
                                  <Text
                                    style={{
                                      textAlign: "center",
                                      color: "white",
                                      fontSize: 16,
                                    }}
                                  >
                                    {answer.text}
                                  </Text>
                                </Pressable>
                              )
                            )}
                          </View>
                        </>
                      )}
                    </>
                  )}
                  {currentQuestionIndex >= questions[0].quiz.length && (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 32,
                        marginVertical: 64,
                      }}
                    >
                      <Text
                        style={{
                          color: "#440066",
                          fontWeight: "bold",
                          fontSize: 48,
                        }}
                      >
                        Complete!
                      </Text>
                      <View
                        style={{
                          backgroundColor: "yellow",
                          paddingVertical: 8,
                          paddingHorizontal: 16,
                          borderRadius: 6,
                          display: displayResult ? "flex" : "none",
                        }}
                      >
                        <Text
                          style={{ color: "black" }}
                        >{`Your score: ${answerScore}${
                          currentQuestionIndex >= questions[0].quiz.length
                            ? `/${questions[0].quiz.length}`
                            : ""
                        }`}</Text>
                      </View>
                      <Pressable
                        onPress={reloadScreen}
                        style={[styles.btn, { width: "90%", maxWidth: 500 }]}
                      >
                        <Text
                          style={{
                            fontSize: 24,
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          Retry
                        </Text>
                      </Pressable>
                      <ScrollView style={styles.table}>
                        <Text style={styles.caption}>How well did you do?</Text>
                        {/* Table Header */}
                        <View style={styles.row}>
                          <Text style={[styles.cell, styles.headerCell]}>
                            Number
                          </Text>
                          <Text style={[styles.cell, styles.headerCell]}>
                            Question
                          </Text>
                          <Text style={[styles.cell, styles.headerCell]}>
                            Answer
                          </Text>
                        </View>
                        {/* Table Body */}
                        <FlatList
                          data={questions[0]?.quiz || []}
                          keyExtractor={(_, index) => index.toString()}
                          renderItem={({
                            item,
                            index,
                          }: {
                            item: { question: string; answers: any[] };
                            index: number;
                          }) => (
                            <View style={styles.row}>
                              <Text style={[styles.cell, styles.textCenter]}>
                                {index + 1}
                              </Text>
                              <Text style={styles.cell}>{item.question}</Text>
                              <Text style={[styles.cell, styles.textCenter]}>
                                {item.answers.find(
                                  (answer: { correct: boolean }) =>
                                    answer.correct
                                )?.text || "N/A"}
                              </Text>
                            </View>
                          )}
                        />
                      </ScrollView>
                    </View>
                  )}
                </View>
              </>
            )}
            {!gameStarted && (
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  marginVertical: 32,
                }}
              >
                <Text
                  style={{
                    color: "#440066",
                    fontWeight: "bold",
                    fontSize: 48,
                    textDecorationLine: "underline",
                    textAlign: "center",
                  }}
                >
                  {questions[0]?.category} Quiz
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginVertical: 16,
                  }}
                >
                  You've got 15 seconds per question. Press{" "}
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      'start'
                    </Text>
                  </View>{" "}
                  when you are ready.
                </Text>
              </View>
            )}
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {!gameStarted && (
                <Pressable
                  onPress={startGame}
                  style={[
                    styles.btn,
                    {
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      width: "90%",
                      maxWidth: 500,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: 24,
                      textAlign: "center",
                    }}
                  >
                    Start
                  </Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    width: "90%",
    height: "80%",
    backgroundColor: "rgba(153,153,153,0.8)",
    borderRadius: 5,
    padding: 10,
    boxShadow: "grey",
  },
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    boxShadow: "grey",
    height: "80%",
    zIndex: -10,
    overflow: "scroll",
  },
  questionInfoArea: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  questionInfoAreaHeading: {
    fontWeight: "bold",
    fontSize: 18,
  },
  btn: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "hsl(1000, 100%, 30%)",
    backgroundColor: "hsl(1000, 100%, 50%)",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: "white",
    outline: "none",
    fontSize: 20,
    cursor: "pointer",
  },
  table: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    overflow: "scroll",
  },
  caption: {
    fontWeight: "bold",
    color: "purple",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  cell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  textCenter: {
    textAlign: "center",
  },
});

export default quiz;
