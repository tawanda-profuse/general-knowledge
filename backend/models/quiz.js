const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
    required: true,
  },
  quiz: [
    {
      question: {
        type: String,
      },
      picture: {
        type: String,
        default: "https://github.com/tawanda-profuse/general-knowledge/blob/master/assets/question-mark.png?raw=true",
      },
      answers: [
        {
          text: { type: String },
          correct: { type: Boolean },
        },
      ],
    },
  ],
});

// Pre-save middleware to set default picture if empty
quizSchema.pre("save", function (next) {
  this.quiz.forEach(item => {
    if (!item.picture) {
      item.picture = "https://github.com/tawanda-profuse/general-knowledge/blob/master/assets/question-mark.png?raw=true";
    }
  });
  next();
});

module.exports = mongoose.model("Quiz", quizSchema);
