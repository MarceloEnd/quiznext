import questions from '../questions/all.json';

export const getQuiz = (id) => {
    const quiz = questions.find(q => q.id === Number(id));
    return quiz || null;
};
