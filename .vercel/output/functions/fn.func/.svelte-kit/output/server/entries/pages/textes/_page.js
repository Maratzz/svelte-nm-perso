const load = async ({ fetch }) => {
  const response = await fetch(`/api/every-texts`);
  const posts = await response.json().then(
    (data) => data.filter((post) => post.meta.categories.includes("textes"))
  );
  return {
    posts
  };
};
export {
  load
};
