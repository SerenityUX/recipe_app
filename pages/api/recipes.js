// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const response = await fetch(
    "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipes"
  );
  const recipes_list = await response.json();
  res.json(recipes_list);
}
