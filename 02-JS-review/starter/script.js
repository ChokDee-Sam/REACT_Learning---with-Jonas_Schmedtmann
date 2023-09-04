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
console.log(book);

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

// console.log(author);
// console.log(title);
// console.log(genres);

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

// ----- Explication complémentaire : le Destructuring de Tableau -----
// L'ordre entre les crochets = l'ordre du tableau [0][1][2] etc...
// Pour faire simple :
// - le 1er element du destructuring = le 1er élément du tableau
// - le 2ème element du destructuring = le 2ème élément du tableau
// - Et ainsi de suite...

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                           REST
//-----------------------------------------------------------------------------------
// - Dans un Destructuring, Rest crée un tableau supplémentaire avec tout le "reste"
// - Rest se place à la fin d'un DESTRUCTURING
// - Fonctionne pour le Destructuring d'Objets ET le Destructuring de Tableaux
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

//----------//----------//----------
//----- Destructuring + REST Operator = création d'un tableau supplémentaire  -----
//----------//----------//----------

// exemple : 1 element de tableau, puis 1 autre, puis TOUT LE RESTE dans un tableau
// const [primaryGenre, secondaryGenre, ...otherGenres] = genres;
// console.log(primaryGenre, secondaryGenre, otherGenres);
// console.log(otherGenres);

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
//-----  exemple pas top : Tableau + Élément = création d'un tableau supplémentaire  -----
//----------//----------//----------

// exemple non désirable dans l'exemple : 1 tableau entier, puis un élément
// const newGenres = [genres, "epic fantasy"];
// newGenres;

//----------//----------//----------
//----- SPREAD Operator = un seul tableau qui reunit tout  -----
//----------//----------//----------

// const newGenres2 = ["epic fantasy", ...genres];
// newGenres2;

//----------//----------//----------
// ----- Peut se placer en début où l'on souhaite
//----------//----------//----------

// const newGenres3 = [...genres, "epic fantasy"];
// newGenres3;

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
// ----- Objet SANS SPREAD sur le book : Objet puis un élément seul (indésirable pour l'exemple)
//----------//----------//----------

// const updatedBook_wrong = {
// Integre l'objet book
// book,
// Ajoute une nouvelle propriété dans l'objet, EN DEHORS de book
// moviePublicationDate: "2001-12-19",
// Ajoute encore une nouvelle propriété dans l'objet, EN DEHORS de book
// pages: 1210,
// };
// console.log(updatedBook_wrong);

//----------//----------//----------
// ----- Objet AVEC SPREAD sur le book : un seul objet
//----------//----------//----------

// const updatedBook = {
// Integre book AVEC SPREAD
// ...book,
// Ajoute une nouvelle propriété DANS l'objet book
// moviePublicationDate: "2001-12-19",
// Données `pages` déjà existante !
// Écrase donc la valeur de la propriété existante (attention, si placée avant, se fera à son tour écrasée)
// pages: 1210,
// };
// console.log(updatedBook);

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                            TEMPLATE LITERALS
//-----------------------------------------------------------------------------------
// - Permet plus de souplesse
// - Permet d'intégrer des expressions JS (ce qui retourne une valeur)
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// let summary = `
// ${title}, a ${pages}-page long book, was written by ${author} and published in ${
//   publicationDate.split("-")[0]
// }`;

// console.log(summary);

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                                TERNARIES
//-----------------------------------------------------------------------------------
// - Permet de retourner des VALEURS, basées sur des conditions
// - Remplace if / else qui est un STATEMENT (et donc, ne retourne pas de valeur)
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// summary = `The book has ${
//   hasMovieAdaptation ? "" : "not"
// } been adapted as a movie`;

// console.log(summary);

// const pagesRange = pages > 1000 ? "over a thousand" : "less than 1000";
// console.log(pagesRange);

// console.log(`The book has ${pagesRange} pages`);

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                                ARROW FUNCTIONS
//-----------------------------------------------------------------------------------
// - Permet d'écrire rapidement une "one line function" (en retirant le return)
// - En cas de multiples lignes de code, on ajoute des accolades + return
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

//----------//----------//----------
// ----- Fonction Classique
//----------//----------//----------

// function getYear_1(str) {
//   return str.split("-")[0];
// }

//----------//----------//----------
// ----- Fonction Arrow
//----------//----------//----------

// const getYear_2 = (str) => str.split("-")[0];

//----------//----------//----------
// ----- Comparaison des 2 appels de fonction : similaire
//----------//----------//----------

// console.log(getYear_1(publicationDate));
// console.log(getYear_2(publicationDate));

// summary = `
// ${title}, a ${pages}-page long book, was written by ${author}
// and published in ${getYear_2(publicationDate)}
// `;

// console.log(summary);

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                  SHORT CIRCUITING and LOGICAL OPERATOR && || ??
//-----------------------------------------------------------------------------------
// - Permet de retourner rapidement des sortes de conditions
// - Une autre façon d'écrire des conditions
// - Le court circuitage se déclenche des valeurs :
//      - Falsy (0, '', null, undefined),
//      - Truthy (le reste)
//      - Null et Undefined
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

//----------//----------//----------
// ----- Opérateur logique &&
//            "Progresse" vers la droite quand c'est Truthy
//            Le court-circuitage survient lors d'un Falsy
// ----- [truthy ? continue : stop]
//----------//----------//----------

// --- Pour synthétiser :
// ---      Return la deuxième info si elle existe, sinon met la première info
// ---    ou bien : Si la première info existe, met donc la seconde info

// console.log(true && "Some string");
// console.log("jonas" && "Some string");

// // Court-circuit (Falsy)
// // falsy value : 0, '', null, undefined
// console.log(false && "Some string");
// console.log(0 && "Some string");
// console.log(null && "Some string");
// console.log(undefined && "Some string");

// // exemple
// console.log(hasMovieAdaptation && "This book has a movie");

//----------//----------//----------
// ----- Opérateur logique ||
//            "Progresse" vers la droite quand c'est Falsy
//            Le court-circuitage survient lors d'un Truthy
// ----- [truthy ? stop : continue]
// ----- TRES PRATIQUE POUR AJOUTER UNE INFORMATION -----
//----------//----------//----------

// --- Pour synthétiser :
// ---      Return cette première info si elle existe, sinon, met donc la deuxième info

// console.log(false || "Some string");
// console.log(null || "Some string");
// console.log(undefined || "Some string");
// console.log(0 || "Some string");

// // Court-circuit (Truthy)
// console.log(true || "Some string");
// console.log("Jonas" || "Some string");

// // exemple
// console.log(book.translations.spanish);
// const spanishTranslation = book.translations.spanish || "NOT TRANSLATED";
// spanishTranslation;

// // PROBLEME AVEC LA VALEUR ZERO : ELLE DONNE UN RESULTAT EXISTANT MAIS FALSY
// console.log(book.reviews.librarything.reviewsCount);
// const countWrong = book.reviews.librarything.reviewsCount || "no data";
// countWrong;

//----------//----------//----------
// ----- Opérateur logique &&
//            RÈGLE LE PROBLEME CONCERNANT LA VALEUR ZERO FALSY (0)
//            "Progresse" vers la droite quand c'est Null ou Undefined
//            Le court-circuitage survient lors d'un Truthy, 0, ''
// ----- [null or undefined ? continue : stop]
//----------//----------//----------

// console.log(null ?? "Some string");
// console.log(undefined ?? "Some string");

// // Court-circuit (tout sauf null et undefined)
// console.log(true ?? "Some string");
// console.log(false ?? "Some string");
// console.log(0 ?? "Some string");
// console.log("" ?? "Some string");

// // exemple
// const count = book.reviews.librarything.reviewsCount ?? "no data";
// count;

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                                OPTIONAL CHAINING ?.
//-----------------------------------------------------------------------------------
// - Utile lorsqu'on n'est pas certain que la valeur existe
// - Permet de lire la propriété suivante UNIQUEMENT si elle est existante
// - Évite les erreurs (du style undefined.undefiined)
// - [La valeur = undefined ou null ? Tu la lis, et tu continues : tu t'arrêtes et return undefined]
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// function getTotalReviewCount(book) {
//   // Sans l'optional chaining : risque d'erreur si propriété undefined / null
//   // const goodread_noSafe = book.reviews.goodreads.reviewsCount;

//   const goodreads = book.reviews?.goodreads?.reviewsCount;
//   const librarything = book.reviews?.librarything?.reviewsCount ?? 0;

//   // goodread_noSafe
//   goodreads;
//   librarything;

//   return goodreads + librarything;
// }

// console.log(getTotalReviewCount(book));

// const books = getBooks();

// function getTotalReviewCount(book) {
//   const goodreads = book.reviews?.goodreads?.reviewsCount;
//   const librarything = book.reviews?.librarything?.reviewsCount ?? 0;

//   // console.log(goodreads);
//   // console.log(librarything);

//   return goodreads + librarything;
// }

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                              ARRAY MAP METHOD
//-----------------------------------------------------------------------------------
// - La méthode .map crée un boucle sur chaque élément d'un tableau
// - Puis crée un nouveau tableau, de même longueur, où chaque élément a reçu la fonction
// - ASTUCE : pour éviter d'écrire {return}, une parenthese suffit => ()
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// // exemple pour un (nouveau) tableau qui sera multiplié par 2
// const x = [1, 2, 3, 4, 5].map((element) => element * 2);
// console.log(x);

// console.log(books);

// // exemple pour avec un (nouveau) tableau tous les titres
// const titles = books.map((element) => element.title);
// console.log(titles);

// // exemple pour avoir un (nouveau) tableau avec tous les auteurs + les titres + le total des reviews (via fonction)
// const essentialData = books.map((element) => ({
//   title: element.title,
//   author: element.author,
//   reviewsCount: getTotalReviewCount(element),
// }));

// essentialData;

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                              ARRAY FILTER METHOD
//-----------------------------------------------------------------------------------
// - La méthode .filter filtre des éléments selon condition
// - Puis crée un nouveau tableau avec chaque élément remplissant la condition
// -
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// // avec avec le nombre de pages
// const longBooks = books.filter((element) => element.pages > 500);
// longBooks;

// // avec le nombre de pages + l'adaptation en film
// const longBooksWithMovie = books
//   .filter((element) => element.pages > 500)
//   .filter((element) => element.hasMovieAdaptation);
// // écriture plus logique
// // .filter((element) => element.pages > 500 && element.hasMovieAdaptation);

// longBooksWithMovie;

// // exemple avec le genre humour
// const humorBooks = books.filter((element) => element.genres.includes("humor"));
// humorBooks;

// // exemple avec le genre aventure + création d'un nouveau tableau avec uniquement les titres
// const adventureBooks = books
//   .filter((element) => element.genres.includes("adventure"))
//   .map((element) => element.title);

// adventureBooks;

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                              ARRAY REDUCE METHOD
//-----------------------------------------------------------------------------------
// - La méthode .reduce a pour but de réduire les tableaux
// - Cette méthode possède 2 paramètres de fonction : un accumulateur + un élément où agir
// - On attribue la valeur de départ (à la fin)
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// exemple avec un calcul cumulé des toutes les pages des livres
// const pagesAllBooks = books.reduce(
//   (accumulator, element) => accumulator + element.pages,
//   0
// );
// pagesAllBooks;

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                              ARRAY SORT METHOD
//-----------------------------------------------------------------------------------
// - La méthode .sort a pour but de trier les tableaux dans un certain ordre
// - Cette méthode possède 2 paramètres de fonction
//  => a - b (pour un ordre ascendant)      => b - a (pour un ordre descendant)
// - ATTENTION : cette méthode modifie le tableau original
// - Pour éviter cette modification : utilisation du .slice() avant le .sort()
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// exemple avec des nombres mal rangés
// const arr = [3, 1, 5, 9, 2, 0];
// const sorted = arr.sort((a, b) => b - a);

// // Le tableau original est lui aussi modifiié
// // De ce fait, pas besoin de forcement créer de nouveaux tableaux
// arr;
// sorted;

// // Astuce pour éviter de modifier le tableau original
// const newArr = [3, 1, 5, 9, 2, 0];
// const newSorted = newArr.slice().sort((a, b) => a - b);

// newArr;
// newSorted;

// // Exemple avec classement selon le nombre de pages des livres
// const sortedByPages = books.slice().sort((a, b) => a.pages - b.pages);
// sortedByPages;

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                            WORKING WITH IMMUTABLE ARRAYS
//-----------------------------------------------------------------------------------
// - Le but est de ne pas modifier le tableau original
// - Spread permet d'ajouter
// - Filter permet de retirer
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

//----------//----------//----------
// ----- Ajouter un objet dans un tableau
//            Le but est de ne pas modifier le tableau original
//            On utilise un Spread du tableau original
// ----- Création d'un objet, puis création d'un nouveau tableau qui recevra le spread, et le nouvel element
//----------//----------//----------

// const newBook = {
//   id: 6,
//   title: "Opération Condor",
//   author: "Jacky Chan",
// };

// Recipe : Create a New Array, Spread the current elements, and add the new element
// const booksAfterAdd = [...books, newBook];
// console.log(booksAfterAdd);

//----------//----------//----------
// ----- Supprimer un objet dans un tableau
//            Le but est de ne pas modifier le tableau original
//            On utilise un .filter() du tableau
// ----- Création d'un variable, qui a un tableau dans lequel on filtre tout ce qui n'est pas id:3
//----------//----------//----------

// Recipe : Filter pour réduire, afin de garder "tout ce qui est", ou "tout ce qui n'est pas"
// const booksAfterDelete = booksAfterAdd.filter((element) => element.id !== 3);
// console.log(booksAfterDelete);

//----------//----------//----------
// ----- Update un objet dans un tableau
//            On utilise un .map() pour conserver la même longueur (on souhaite conserver toutes les données)
//            On cible les conditions dans une ternaire, qui agiront durant la boucle map
//            On peut donc y ajouter un objet, avec un spread de l'original, pour avoir tout le contenu original
//
// ----- Création d'un variable, qui a un tableau dans lequel on filtre tout ce qui n'est pas id:3
//----------//----------//----------

// Recipe : use the map method, because it creates an array with the same length as the original
// const booksAfterUpdate = booksAfterDelete.map((element) =>
//   element.id === 1 ? { ...element, pages: 1000000 } : element
// );
// console.log(booksAfterUpdate);

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                        ASYNCHRONOUS JAVASCRIPT : PROMISES
//-----------------------------------------------------------------------------------
// - Fetch necessite une requête API, avant que les infos ne reviennent ici
// - C'est donc décalé dans le temps : Asynchrone
// - 3 réponses possibles : PENDING, REJECTED, FULFILLED
// - Il faut donc donner des instructions pour quand les données reviendront
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// console.log("Sam");

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//                        ASYNCHRONOUS JAVASCRIPT : ASYNCH / AWAIT
//-----------------------------------------------------------------------------------
// - Asynch permet de dire qu'il y aura des données en différées (asynchrones)
// - Await permet d'attendre que la donnée arrive (met le script JS en attente)
// - Le fait d'encapsuler les resultat du fetch + le json est plus "propre"
// - ATTENTION : le Await fonctionne uniquement à l'intérieur de la fonction
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

// async function getToDos() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/todos");
//   const data = await res.json();
//   console.log(data);

//   return data;
// }

// const todos = getToDos();
// console.log("Sam");
