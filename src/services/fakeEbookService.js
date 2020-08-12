import * as genresAPI from "./fakeGenres";

const books=[
    {
        "_id": "5efcdb967c5d9c29bcb4b088",
        "title": "Dracula",
        "author": "Bram Stoker",
        "genre": {
            "_id": "5efcda887c5d9c29bcb4b080",
            "name": "Horror"
        },
        "purchasedBy": 3,
        "cost": 20,
        "__v": 0
    },
    {
        "_id": "5ef6499324170863bc6a9ecd",
        "title": "Harry Potter",
        "author": "JK",
        "genre": {
            "_id": "5ef6485a0c80673bd0189a91",
            "name": "Fictional"
        },
        "purchasedBy": 15,
        "cost": 10,
        "__v": 0
    },
    {
        "_id": "5efcebf8e6737251f86ebe76",
        "title": "Yes Please",
        "author": " Amy Poehler",
        "genre": {
            "_id": "5efceb4be6737251f86ebe71",
            "name": "comedy"
        },
        "purchasedBy": 16,
        "cost": 15,
        "__v": 0
    },

    {
        "_id": "5efcdb967c5d9c29bcb4b0881",
        "title": "Dracula",
        "author": "Bram Stoker",
        "genre": {
            "_id": "5efcda887c5d9c29bcb4b080",
            "name": "Horror"
        },
        "purchasedBy": 3,
        "cost": 20,
        "__v": 0
    },
    {
        "_id": "5ef6499324170863bc6a9ecd1",
        "title": "Harry Potter",
        "author": "JK",
        "genre": {
            "_id": "5ef6485a0c80673bd0189a91",
            "name": "Fictional"
        },
        "purchasedBy": 15,
        "cost": 10,
        "__v": 0
    },
    {
        "_id": "5efcebf8e6737251f86ebe761",
        "title": "Yes Please",
        "author": " Amy Poehler",
        "genre": {
            "_id": "5efceb4be6737251f86ebe71",
            "name": "comedy"
        },
        "purchasedBy": 16,
        "cost": 15,
        "__v": 0
    }
]

export function deleteBook(id) {
    let movieInDb = books.find(m => m._id === id);
    books.splice(books.indexOf(movieInDb), 1);
    return movieInDb;
  }

export function getBooks() {
    return books;
  }

  export function getBook(id) {
    return books.find(m => m._id === id);
  }
  
  export function saveBook(movie) {
    let movieInDb = books.find(m => m._id === movie._id) || {};
    movieInDb.title = movie.title;
    movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
    movieInDb.author = movie.author;
    movieInDb.purchasedBy = 0;
    movieInDb.cost = movie.cost;
  
    if (!movieInDb._id) {
      movieInDb._id = Date.now().toString();
      books.push(movieInDb);
    }
  
    return movieInDb;
  }