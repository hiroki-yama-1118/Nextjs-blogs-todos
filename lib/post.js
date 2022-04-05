import fetch from "node-fetch";

export const getAllPostData = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post`)
  );
  const posts = await res.json();
  const filteredPosts = posts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return filteredPosts;
};

export const getAllPostIds = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post`)
  );
  const posts = await res.json();
  return posts.map((post) => {
    return {
      para,
      s: {
        id: String(post.id),
      },
    };
  });
};

export const getPostData = async (id) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}`)
  );
  const post = await res.json();
  return {
    post,
  };
};
