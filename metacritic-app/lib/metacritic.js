const gamesData = require("./metacritic.json");

export async function getLatestGames() {
  const nodes = gamesData.titles.nodes;

  return nodes.map((node) => ({
    description: node.description,
    releaseDate: node.releaseDate,
    score: node.rating ? node.rating.average : null,
    slug: node.id,
    title: node.title,
    image: node.primaryImage ? node.primaryImage.url : null,
  }));
}

export async function getGameDetails(slug) {
  const t = gamesData.details[slug];
  if (!t) throw new Error("Juego no encontrado en el JSON");

  const cardImage = t.images.find((img) => img.role === "CARD") || t.images[0];
  const imgUrl = cardImage ? cardImage.url : null;

  const reviews = (t.reviewSet?.reviews || []).map((rev) => ({
    quote: rev.body,
    score: rev.rating,
    date: rev.date,
    publicationName: null,
    author: rev.author.name,
  }));

  return {
    img: imgUrl,
    title: t.title,
    slug: t.id,
    description: t.description,
    score: t.rating ? t.rating.average : null,
    reviews,
  };
}
