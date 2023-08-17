const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

// Retournera simplement l'id correspondant
function getBook(id) {
  return data.find((d) => d.id === id);
  // return data[id-1]
}

// Appel de la fonction dans une constante
const book = getBook(2);
book;

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                              DESTRUCTURING
//-----------------------------------------------------------------------------------
// - La destructuring doit avoir EXACTEMENT le même nom que la propriété d'objet
// - Autant pour les objets, que pour les tableaux
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

//----------//----------//----------
//----- SANS Destructuring : Objet -----
//----------//----------//----------

// const author = book.author;
// const title = book.title;
// const genres = book.genres
// console.log(author, title, genres);

//----------//----------//----------
//----- AVEC Destructuring : Objet -----
//----------//----------//----------

const { author, title, pages, publicationDate, genres, hasMovieAdaptation } =
  book;

console.log(author, title, genres);

//----------//----------//----------
//----- SANS Destructuring : Tableau -----
//----------//----------//----------

// const primaryGenre = genres[0];
// const secondaryGenre = genres[1];
// console.log(primaryGenre, secondaryGenre);

//----------//----------//----------
//----- AVEC Destructuring : Tableau -----
//----------//----------//----------

//----- Classique -----
// const [primaryGenre, secondaryGenre] = genres;
// console.log(primaryGenre, secondaryGenre);

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                           REST
//-----------------------------------------------------------------------------------
// - Dans un Destructuring, Rest crée un tableau supplémentaire avec tout le "reste"
// - Rest se place à la fin d'un DESTRUCTURING
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

//----------//----------//----------
//----- Destructuring + REST Operator = création d'un tableau supplémentaire  -----
//----------//----------//----------

// exemple : 1 element de tableau, puis 1 autre, puis un tableau entier
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;
console.log(primaryGenre, secondaryGenre, otherGenres);

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                           SPREAD - dans un tableau
//-----------------------------------------------------------------------------------
// - SPREAD crée un tableau qui prendra l'ensemble des éléments
// - SPREAD peut se placer autant au début, qu'en fin de tableau
// - SPREAD s'écrit comme REST, sauf qu'il ne fait pas appel au DESTRUCTURING
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

//----------//----------//----------
//-----  Tableau + Élément = création d'un tableau supplémentaire  -----
//----------//----------//----------

// exemple : 1 tableau entier, puis un élément
const newGenres = [genres, "epic fantasy"];
newGenres;

//----------//----------//----------
//----- SPREAD Operator = un seul tableau qui reunit tout  -----
//----------//----------//----------

const newGenres2 = ["epic fantasy", ...genres];
newGenres2;

//----------//----------//----------
// ----- Peut se placer en début où l'on souhaite
//----------//----------//----------

const newGenres3 = [...genres, "epic fantasy"];
newGenres3;

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                           SPREAD - dans un objet
//-----------------------------------------------------------------------------------
// - SPREAD crée un objet qui prendra l'ensemble des éléments
// - SPREAD peut se placer autant au début, qu'en fin d'objet
// - SPREAD s'écrit comme REST, sauf qu'il ne fait pas appel au DESTRUCTURING
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

//----------//----------//----------
// ----- Objet sans SPREAD sur le book : Objet dans Objet (confusion)
//----------//----------//----------

const updatedBook_wrong = {
  // Integre book
  book,
  // Ajoute une nouvelle propriété dans l'objet
  moviePublicationDate: "2001-12-19",

  // Écrase une propriété existante
  pages: 1210,
};
updatedBook_wrong;

//----------//----------//----------
// ----- Objet AVEC SPREAD sur le book : un seul objet
//----------//----------//----------

const updatedBook = {
  // Integre book AVEC SPREAD
  ...book,
  // Ajoute une nouvelle propriété dans l'objet
  moviePublicationDate: "2001-12-19",

  // Écrase une propriété existante (attention, si placée avant, se fera à son tour écrasée)
  pages: 1210,
};
updatedBook;

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                            TEMPLATE LITERALS
//-----------------------------------------------------------------------------------
// - Permet plus de souplesse
// - Permet d'intégrer des expressions JS (ce qui retourne une valeur)
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

let summary = `
${title}, a ${pages}-page long book, was written by ${author} and published in ${
  publicationDate.split("-")[0]
}
`;

summary;

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                                TERNARIES
//-----------------------------------------------------------------------------------
// - Permet de définir des valeurs selon des conditions
// - Remplace if / else qui est un statement (et donc ne retourne pas de valeur)
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

summary = `The book has ${
  hasMovieAdaptation ? "" : "not"
} been adapted as a movie`;

summary;

const pagesRange = pages > 1000 ? "over a thousand" : "less than 1000";
pagesRange;

console.log(`The book has ${pagesRange} pages`);

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                                ARROW FUNCTIONS
//-----------------------------------------------------------------------------------
// - Permet d'écrire rapidement une "one line function" (en retirant le return)
// - En cas de multiples lignes de code, on ajoute des accolades + return
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

function getYear_1(str) {
  return str.split("-")[0];
}

const getYear_2 = (str) => str.split("-")[0];

console.log(getYear_1(publicationDate));
console.log(getYear_2(publicationDate));

summary = `
${title}, a ${pages}-page long book, was written by ${author} 
and published in ${getYear_2(publicationDate)}
`;

summary;
