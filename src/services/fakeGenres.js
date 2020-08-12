

export const genres=[
    {
        "_id": "5ef6485a0c80673bd0189a91",
        "name": "Fictional",
        "__v": 0
    },
    {
        "_id": "5efcda887c5d9c29bcb4b080",
        "name": "Horror",
        "__v": 0
    },
    {
        "_id": "5efceb4be6737251f86ebe71",
        "name": "comedy",
        "__v": 0
    }
]

export function getGenres() {
    return genres.filter(g => g);
  }
  