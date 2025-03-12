"use client";

const PostsList = ({ posts }) => {
  console.log("----------------------", posts);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="flex items-center gap-4 mb-4">
            {post.heroImage?.url && (
              <img
                src={post.heroImage.url}
                alt={post.title}
                className="w-16 h-16 object-cover rounded-md"
              />
            )}
            <span>{post.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;

