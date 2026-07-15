import questions from '../questions/all.json';

export const getRandomQuestions = (quizEntry, count = 10) => {
    if (!quizEntry || !quizEntry.questions) return [];

    const shuffled = [...quizEntry.questions].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
};

export const categories = () => {
    const uniqueThemen = [...new Map(questions.map(item => [item.id, item.kategorie])).entries()];

    return uniqueThemen.sort((a, b) => a[1].localeCompare(b[1]));
}
