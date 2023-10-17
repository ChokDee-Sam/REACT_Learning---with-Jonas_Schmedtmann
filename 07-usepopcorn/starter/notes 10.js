/*
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    Hooks
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    Ce sont des fonctions natives, en interne, 
    qui nous permettent de nous "connecter" à l'intérieu de React

        - Créer et acceder aux States depuis le Fiber Tree 
        - Enregistrer un Side Effect dans le Fiber Tree 
        - Selectionner le DOM manuellement
        - Et plein d'autres choses...

    Le nom des Hooks comment toujours avec "use"

    Permet facilement la réutilisation de "Non-Visual Logic"
    On peut composer des multiples Hooks dans notre propre Custom Hook.

    Donne à un Function Composant le droit d'avoir son propre State et Side Effect
    (Avant la version 16.8, la seule possibilité était les Class Composants)



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    Plusieurs Hooks
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

Les plus utilisés :
    - useState
    - useEffect
    - useReducer
    - useContext


Les moins utilisés (à apprendre) : 
    - useRef
    - useCallback
    - useMemo
    - useTransition
    - useDeferredValue

Les moins utilisés (à mettre de coté pour le moment)
    - useLayoutEffect
    - useDebugValue
    - useImperativeHandle
    - useImperativeHandle

Uniquement pour les librairies :
    - useSyncExternalStore
    - useInsertionEffect



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    Les 2 Règles de Hook
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    1 - Call les Hooks au Top Level
        - Pas de Call dans :
            - une condition
            - une boucle
            - une fonction imbriquée
            - ou après un Early Return

        - Car : les Hooks doivent TOUJOURS être Call dans le même Ordre 


    2 - Les Hooks doivent être Call depuis une Function
        - Call uniquement depuis : 
            - une Function Component
            - ou un Custom Hook



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    Les Hooks dépendent de l'Ordre d'Appel      CALL ORDER
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
/*
QUand une App est Render, React crée un React Element Tree (Virtual Dom)
    => Initial Render = Création du Fiber Tree ( en dehors du Virtual Dom)
        => Le Fiber Tree va créer des FIBER : les Props, Liste, Hooks...
            => il y aura une liste d'Appel des Hooks utilisés
                => IL EST INDISPENSABLE QUE LA LINKED LISTE SOIT LA MÊME

Il ne faut pas que les Links soient broken après un Render
Et pour ça, il ne faut pas qu'un Link disparaissent suite à une condition ou autre
React serait "confus"

Les Hooks ont besoin d'être Call dans le même Ordre à chaque Render.
Et le moyen de faire ça, c'est d'appeler les Hooks au Top Level

Pourquoi s'embêter avec cette Linked List qui oblige une règle étrange ?
    La raison est que, cette Linked List, qui est reliée à la Hook Call Ordre,
    est le moyen le plus simple d'associer chaque Hook à sa valeur.

    Fondadamentalement, l'Ordre dans lequel le Hook est appelé 
    identifie de manière UNIQUE le Hook.

    React connait la valeur des States, 
    et ces valeurs sont associées à l'Ordre d'Appel (Call Order)

    La Linked List, est en quelque sorte une liste de valeurs.
    Grace à ça, pas besoin d'attribuer manuellement des noms à chaque Hooks.
    C'est pratique, et cela évite donc certains problèmes.



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//  More details of useStates
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    L'initial value d'une State est valable UNIQUEMENT lors de l'initial Render
        (only on Component Mount)
    
    Ce qui peut être constamment valable, c'est une State Derivée, 
    car elle est "regenerée" à chaque re-Render du Composant


    Pour éviter les Stale States (states obsoletes) 
    => on passe un callback de la current value



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//  Initialiser la State avec un Callback (Lazy Initial State)
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


Le local storage : 
    - se compose d'une paire key value, et est dispo dans le browser
    - et la value est une String (penser à convertir si besoin)


    Pour initialser une State avec un local Storage, 2 façons :
        - soit en passant par un State
        - soit en passant par un useEffect


// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//    Initialiser la State avec le localStorage
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


    On pourrait écrire ça apres une fonction qui mettrait à jour le addWatched
        localStorage.setItem("watched", JSON.stringify([...watched, movie]))
    Et ensuite écrire le fait de supprimer le localStore à chaque deleteWatched
        => Pas top, et plus compliqué


    La solution idéale est : 
        - un useEffect qui crée un localStorage, avec surveillance [watched]
        - une functionCallback dans l'initial Render qui recupere ce localStorage


Exemple
*/ useEffect(
  function () {
    localStorage.setItem("watched", JSON.stringify(watched));
  },
  [watched]
);

const [watched, setWatched] = useState(function () {
  const storedValue = localStorage.getItem("watched");
  return JSON.parse(storedValue);
});
/*

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    Chacun son rôle
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

La fonction dans le useState 
    => Fait le job pour l'initial Render

La fonction dans le useEffect 
    => mettra à jour le localStorage à chaque fois que le useState changera

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    Attention
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

On ne doit pas appeler une fonction dans un useState
car un appel de fonction ne lui transmet pas la fonction dans le useState

Même si React ignore la valeur de cela,
=> il appellerait toujours cette fonction à chaque Render !


// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    useState : 2 manières de créer
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    1. simple :
        - en transmettant une single value

    2. basée sur une fonction (lazy evaluation)
        - en lui une callback function, qui return donc une value

    La fonction sera :
        - uniquement Call à l'Initial Render
        - et aura 2 règles à respecter :
            - être Pure
            - ne pas accepter d'arguments


// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    useState : 2 manières d'Update 
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


    1. simple :
        - en transmettant une single value

    2. basée sur une fonction  :
        - en prenant en compte la Current State
        - et aura 2 règles à respecter :
            => être Pure
            => return le prochain State


PS : Lors d'un Update
    - ne JAMAIS mutate un object/array
        => remplacez les par un nouveau



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    Comment NE PAS SELECTIONNER des éléments du DOM
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

Réponse : avec une approche impérative

*/ useEffect(function () {
  const el = document.querySelector(".search");
  el.focus();
});
/*

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    useRef 
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

C'est un objet qui contient des valeurs 'Mutables'
    - dont la DATA persiste entre les Renders.
    - et dont les mises à jour de cet objet ne produit aucun Re-Render

    C'EST ESSENTIELLEMENT FAIT POUR DE LA DATA NON-VISUELLE !
        Si visuel / JSX => useState est mieux

useRef apparait uniquement dans les eventHandlers ou useEffects
(peut apparaitre dans du JSX, mais generalement pas sa place car non visuel !)



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    useRef : 2 grands cas d'utilisations 
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    - Créer une variable qui reste la même à travers les Renders
        (State précédent, setTimeout id, etc...)
    - Selectionner et stocker des éléments du DOM


Attention : Pas de lecture ou d'écriture dans le Render Logic (comme les States)
            => Sinon Side Effect indésirable
            => Opter dans un useEffect



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    State VS Ref
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

ref est une sorte de State avec moins de pouvoir, car :
    - Comme State, sa Data persiste entre les Renders
    - MAIS ne cause pas un Re-Render lors d'un Update

State   =   immutable   - Update Asynchrone
Ref     =   mutable     - Update Synchrone (comme n'importe quel object JavaScript)


On utilise :
    - State pour stocker de la Data qui doit re-Render le Composant
    - Rest pour stocker de la Data au fil du temps, mais qui ne doit pas Re-Render



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    useRef : Explication avant les étapes
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– 

On utilise un useEffect pour utiliser un useRef que contiendra un DOM Element
(car pas possible de muter un useRef dans le Render Logic)

*/ <input className="abc" ref={refName} />;
/*

car le useRef est ajouté à ce DOM Element uniquement après que le DOM ait été load

C'est parfait, car le useEffect s'exécute également après le chargement du DOM.
C'est donc l'endroit idéal pour utiliser un useRef



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    useRef : 3 étapes
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


    1 - Créer le useRef(null) dans une variable (checker si bien importer)
*/ const inputEl = useRef(null);
/*

    2 - Utiliser la variable.current dans un useEffect
        (car pas possible de mutate un useRef    dans le Render Logic)
*/ useEffect(function () {
  console.log(inputEl.current);
  inputEl.current.focus();
}, []); // run on Mount
/*
    3 - intégrer la ref dans la Prop ref
*/ ref = { inputEl }; /*

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    useRef conditionnel dans un useEffect, avec un addEventListener
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    C'est le même procédé que les 3 étapes précédente, 
    sauf que l'étape 2 exige : 
        - Une création de function callback(e)
        - un addEventListener
        - un clean up qui Return un addRemoveListener
        - et un tableau des dépendances avec l'élément demandé
*/
useEffect(
  function () {
    // création de function callback avec (e)
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }

    // addEventListener qui enclenche la fonction callback
    document.addEventListener("keydown", callback);

    // removeEventListener clean pour éviter les multiples Events
    return () => document.removeEventListener("keydown", callback);
  },
  [setQuery]
);
/*

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    Autres cas de useRef
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    
    Un useRef n'a pas de setter function
    À la place, on mutate la current propriété qui est dans la ref
      countRef.current++

    C'est pour ça qu'on dit qu'un useRef, 
    c'est un peu comme une boite qui peut contenir n'importe quelle valeur

    En utilisant une simple variable, elle se serait reset après chaque Render
    Donc, ça aurait été une variable non persistante à travers les Renders



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  Custom Hooks : explication et exemple
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


Dans React, il y a 2 grands lignes : 
    1 - Le visuelle : L'UI
    2 - Le non-visuel : La Logique


React priviégie la réutilisation :
À l'image d'un Composant qui permet une réutilisation de l'UI,
un custom Hook permet de réutiliser de la logique.


C'est une fonction JavaScript, donc :
  - peut recevoir de la Data
  - peut return de la Data 
        => dans un array ou object

  
*/
function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return [data, isLoading];
} /*
    


// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    Custom Hooks VS Composant
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

Un composant peut recevoir des Props            =>  return du JSX
Un Custom Hook peut recevoir des arguments      =>  return array / object


Le Composant
    -  sera obligé de return du JSX


Le Custom Hook  
    - sera obligé d'utiliser 1 ou plusieurs Hooks
    - aura son nom de fonction commençant par "use"



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    Custom Hook Avantage : l'ensemble de Logic
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


On prend toute la Logique (non visuelle) qui va ensemble
On la met dans une Custom Hook
On met le necessaire via un argument/propriété de fonction
On return dans un array/object le necessaire

Et dans un autre fichier 
    - on appelle cette fonction
    - et on utilise le Destructuring pour récupérer les elements du return



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    useLocalStorage
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––




*/
