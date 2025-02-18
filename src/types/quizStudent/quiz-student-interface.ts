export interface CreateQuizStudent {
    quiz : string;
    studentGrade : string;
    studentBatch : string;
}

export type FindQuizStudent = Partial<{
    quizId : string;
    student : string;
}>;