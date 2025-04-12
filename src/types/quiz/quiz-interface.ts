export interface CreateQuiz {
    title: string;
    code: string;
    description: string;
    password: string;
    teacher: string;
    subject: string;
    grade: string;
    batch: string;
    startDate: string;
    startTime: string;
    endTime: string;
}
export interface UpdateQuiz {
    title: string;
    code: string;
    description: string;
    password: string;
    startDate: string;
    startTime: string;
    endTime: string;
}

export interface UpdateTotals {
    quizTotalMarks : number;
    quizTotalQuestions : number;
    passingMarks : number;
}

export type QuizQueryParams = Partial<{
    subject: string;
    teacher: string;
    batch: string;
    grade: string;
    status: string;
}>;