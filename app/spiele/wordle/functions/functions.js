import data from './questions.json';

/**
 * Gibt den passenden Eintrag zur ID zurück.
 * @param {number} id - Die gesuchte ID (1-20)
 * @returns {object|null} - Das JSON-Objekt oder null, falls nichts gefunden wurde.
 */

export const getKategorieById = (id) => {
  // .find() sucht das erste Element, auf das die Bedingung zutrifft
  const entry = data.find((item) => item.id === id);
  return entry || null;
};


export const categoriesWordle = () => {
  // Wir erstellen ein Mapping, um sicherzustellen, dass jede Kategorie nur einmal vorkommt
  // (Falls deine IDs 1-20 alle einzigartig sind, reicht ein einfaches .map)
  const uniqueEntries = data.map(item => ({
    id: item.id,
    kategorie: item.kategorie,
    iconSrc: item.iconSrc,
    fragen: item.fragen
  }));

  // Sortierung alphabetisch nach dem Kategorienamen
  return uniqueEntries;
};



// ich brauche ein json datei in folgendem format:
//
// [  { "id": 1, "kategorie": "Natur", "iconSrc": "natur", "fragen": [{"id":1,"wort":"Birke"},{"id":2,"wort":"Blume"}]} ]
//
// dabei möchte ich 10 verschiedene Kategorien haben mit jeweils 10-15 Fragen
//
// die wörter für "wort" sollten genau 5 Buchstaben sein, nur deutsche Wörter und kindergerecht sein
//dazu sollten die wörter keine leerzeichen enthalten und keine wörter mit ä ö oder ü
