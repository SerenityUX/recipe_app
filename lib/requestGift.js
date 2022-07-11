const GiftBody = {
  email: "luna@wholefoods.com",
  recipes_id: "62",
  //Not sure I can do ""
};

// Type response
const requestGift = async (body) => {
  const response = await fetch(
    "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/gift/{recipes_id}",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  ).then((res) => res.json());

  if (response?.code) return [undefined, response?.message];
  return [response, undefined];
};

export default requestGift;
