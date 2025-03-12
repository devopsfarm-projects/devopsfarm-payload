"use client";

import { Key } from "react";

interface Post {
  [x: string]: any;
  id: Key;
  title: string;
  richText?: {
    root?: {
      children?: { 
        children?: { 
          text?: string;
          type?: string;
          fields?: {
            linkType?: string;
            url?: string;
          };
        }[];
      }[];
    };
  };
  heroImage?: {
    url?: string;
  };
}

const PostsList = ({ posts }: { posts: Post[] }) => {
  console.log("----------------------", posts);

  return (
    <div className="py-28 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Blogs</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {posts.map((post) => {
            
            // Extract all URLs
            const postLinks = post.content?.root?.children?.[0]?.children
              ?.filter((child: { fields: { linkType: string; }; }) => child.fields?.linkType === "custom")
              ?.map((child: { fields: { url: any; }; }) => child.fields?.url) || [];

            return (
              <div key={post.id} className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-bold text-black mb-2">{post.title}</h3>
                <h3 className="text-black mb-2">{post.createdAt}</h3>

                {/* Render hero image */}
                {post.heroImage?.url ? (
                  <img
                    src={post.heroImage.url}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-md mt-4"
                  />
                ) : (
                  <p className="text-gray-400 text-sm mt-2">No image available</p>
                )}

                {/* Display all post links */}
                {postLinks.length > 0 ? (
                  <div className="mt-4">
                    <ul className="list-disc pl-5">
                      {postLinks.map((url: string | undefined, index: Key | null | undefined) => (
                        url && (
                          <li key={index}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                Link 
                              </button>
                            </a>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm mt-2">No links available</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No Blogs available.</p>
      )}
    </div>
  );
};

export default PostsList;
