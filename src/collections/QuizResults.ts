import { CollectionConfig } from "payload";

const QuizResponses: CollectionConfig = {
  slug: "quizResponses",
  fields: [
    { name: "email", type: "text", required: true }, // ✅ Replaced userId with email
    { name: "quizId", type: "text", required: true },
    { name: "answers", type: "json", required: true },
    { 
      name: "submittedAt", 
      type: "date", 
      required: true, 
      defaultValue: () => new Date() // ✅ Stores Date object directly
    }
  ],
};

export default QuizResponses;


// //QuizResults.ts
// import { CollectionConfig } from "payload";

// const QuizResponses: CollectionConfig = {
//   slug: "quizResponses", 
//   fields: [
//     { name: "userId", type: "text", required: true },
//     { name: "quizId", type: "text", required: true },
//     { name: "answers", type: "json", required: true },
//     { name: "submittedAt", type: "date", required: true, defaultValue: () => new Date() }
//   ],
// };

// export default QuizResponses;
