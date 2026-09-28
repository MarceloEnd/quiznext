import questions from '../json/offlinegames.json';

export const getGame = (id) => {
    const game = questions.find(q => q.id === Number(id));
    return game || null;
};

export const categories = () => {
    const uniqueThemen = [...new Map(questions.map(item => [item.id, item])).values()];
    return uniqueThemen.sort((a, b) => a.name.localeCompare(b.name));
}
