export interface CreateQuestion {
    quiz : string;
    questionNumber : string;
    question : string;
    correctAnswer : string;
    marks : number;
    options : {
        option : string;
    }[];
}

export type QuestionFindAll = Partial<{
    questionNumber : string;
}>

export interface CheckAnswer {
    quizId : string;
    questionId : string;
    studentId : string;
    studentAnswer : string;
}

export interface QuestionFormdata {
    _id: string;
    question: string;
    marks: number;
    options: { option: string }[];
    correctAnswer: string;
}