import { getPayload } from "payload";
import config from "@payload-config";
import PostsList from "./PostsList";

const fetchPosts = async () => {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "posts",
      depth: 2,
      page: 1,
      limit: 10,
      pagination: false,
      sort: "-title",
      fallbackLocale: false,
      overrideAccess: false,
      showHiddenFields: true,
    });

    return result.docs.map(post => ({
      ...post,
      heroImage: post.heroImage
        ? typeof post.heroImage === "string"
          ? { url: post.heroImage }
          : "url" in post.heroImage
          ? { url: post.heroImage.url }
          : undefined
        : undefined,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; 
  }
};

export default async function PostsPage() {
  const posts = await fetchPosts();

  if (!posts || !Array.isArray(posts)) {
    return <div>Error loading posts. Please try again later.</div>;
  }

  return <PostsList posts={posts} />;
}





// "use client";

// import config from '@payload-config';
// import { getPayload } from 'payload';



// const MyServerComponent = async () => {
//   const payload = await getPayload({ config });
//   const result = await payload.find({
//     collection: 'posts',
//     depth: 2,
//     page: 1,
//     limit: 10,
//     pagination: false,
//     sort: '-title',
//     fallbackLocale: false,
//     overrideAccess: false,
//     showHiddenFields: true,
//   });

//   console.log("---------------------------",result)
//   return (
//     <div>
//       <h2>Posts</h2>
//       <ul>
//         {result.docs.map((post) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyServerComponent;



// import config from '@payload-config';
// import { getPayload } from 'payload';

// const MyServerComponent = async () => {
//   const payload = await getPayload({ config });


//   const pagesResult = await payload.find({ collection: 'pages', limit: 100 });

//   const devopsImpactPages = pagesResult.docs.filter((page) => page.hero?.type === 'devopsImpact');

//   return (
//     <div>
//       <h1>DevOps Impact Pages</h1>

//       {devopsImpactPages.length > 0 ? (
//         devopsImpactPages.map((page) => (
//           <div key={page.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//             <p><strong>ID:</strong> {page.id}</p>
//             <p><strong>Status:</strong> {page._status}</p>
//             <p><strong>Created At:</strong> {new Date(page.createdAt).toLocaleString()}</p>
//             <p><strong>Updated At:</strong> {new Date(page.updatedAt).toLocaleString()}</p>

//             {/* Hero Section */}
//             <h3>Hero</h3>
//             <p><strong>Type:</strong> {page.hero?.type}</p>

//             {page.hero?.richText && (
//               <div>
//                 <h4>Rich Text:</h4>
//                 <p>{page.hero.richText.root.children.map((child, index) => (
//                   <span key={index}>{child.children?.map((text: { text: any; }) => text.text).join(' ')} </span>
//                 ))}</p>
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No pages found with DevOps Impact hero.</p>
//       )}
//     </div>
//   );
// };

// export default MyServerComponent;


// import config from '@payload-config';
// import { getPayload } from 'payload';

// const MyServerComponent = async () => {
//   const payload = await getPayload({ config });

 
//   // const pagesResult = await payload.find({
//   //   collection: 'pages',
//   //   limit: 200, 
//   //   where: {
//   //     'hero.richText': { exists: true },
//   //     'hero.media.url': { exists: true },
//   //   },
//   // });

//   const Herosection = await payload.find({
//     collection: 'pages',
//     limit: 200, 
//     where: {
//       'hero.richText': { exists: true },
//       'hero.media.url': { exists: true },
//       or: [
//         { title: { contains: 'hero' } },  
//         { slug: { contains: 'hero' } }   
//       ]
//     },
//   });
  
//   console.log(Herosection);
  

 
//   const collectionsData: Record<string, any[]> = {};
//   for (const collection of (await config).collections || []) {
//     if (collection?.slug) {
//       const result = await payload.find({
//         collection: collection.slug,
//         limit: 100,
//       });
//       collectionsData[collection.slug] = result.docs;
//     }
//   }

// console.log("---------------------------------",Herosection)

//   return (
//     <div>
//       {Herosection.docs.length > 0 ? (
//         Herosection.docs.map((page) => (
//           <div
//             key={page.id}
//           >
           
//             {page.hero && (
//               <>
//               <section className="w-full max-w-4xl bg-black shadow-lg rounded-lg p-6">
//               <h1 className="text-4xl font-bold text-gray-100">
//               {page.hero.richText?.root?.children?.length > 0 && (
//                   <div>
//                     {page.hero.richText.root.children[0].children.map((child: { text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
//                       <span key={index} className="block">
//                         {child.text}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//                 </h1>
//                 {page.hero.richText?.root?.children?.length > 0 && (
//                   <div>
//                     {page.hero.richText.root.children[1].children.map((child: { text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
//                       <span key={index} className="block">
//                         {child.text}
//                       </span>
//                     ))}
//                   </div>
//                 )}
               
                
//                 {page.hero.media?.url && (
//                   <div>
                  
//                     <img
//                       src={page.hero.media.url}
//                       alt="Hero Media"
//                       style={{ maxWidth: '100%', height: 'auto' }}
//                     />
//                   </div>
//                 )}
//                 </section>
//               </>
//             )}

//             {page.layout?.map((block, blockIndex) =>
//               block.blockType === 'content'
//                 ? block.columns?.map((column, colIndex) =>
//                     column.richText?.root?.children?.map((child, childIndex) => (
//                       <div key={`${blockIndex}-${colIndex}-${childIndex}`}>
//                         {child.children?.map((text, textIndex) => (
//                           <span key={textIndex}>
//                             {text.text} {text.type === 'linebreak' ? <br /> : ' '}
//                           </span>
//                         ))}
//                       </div>
//                     ))
//                   )
//                 : null
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No pages found.</p>
//       )}

     
//     </div>
//   );
// };

// export default MyServerComponent;







// import config from '@payload-config';
// import { getPayload } from 'payload';

// const MyServerComponent = async () => {
//   const payload = await getPayload({ config });


//   const pagesResult = await payload.find({ collection: 'pages',
//   limit: 200
//  });
//   const collectionsData: Record<string, any[]> = {};

//     for (const collection of (await config).collections) {
//       if (collection.slug) {
//         const result = await payload.find({ collection: collection.slug, limit: 100 }); // Fetch up to 100 records
//         collectionsData[collection.slug] = result.docs;
//       }
//     }
//   return (
//     <div>
//       <h1>All Data from Payload CMS</h1>
//      <div>
    
//        {Object.entries(collectionsData).map(([collectionName, docs]) => (
//          <div key={collectionName}>
//            <h2>{collectionName}</h2>
//            <ul>
//              {docs.map((doc) => (
//                <li key={doc.id}>{JSON.stringify(doc)}</li>
//              ))}
//            </ul>
//          </div>
//        ))}
//      </div>
//       {/* Pages Section */}
//       <h2>Pages</h2>
//       {pagesResult.docs.length > 0 ? (
//         pagesResult.docs.map((page) => (
//           <div key={page.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//             <p><strong>ID:</strong> {page.id}</p>
//             <p><strong>Status:</strong> {page._status}</p>
//             <p><strong>Slug Lock:</strong> {page.slugLock ? 'Yes' : 'No'}</p>
//             <p><strong>Created At:</strong> {new Date(page.createdAt).toLocaleString()}</p>
//             <p><strong>Updated At:</strong> {new Date(page.updatedAt).toLocaleString()}</p>

//             {/* Hero Section */}
//             <h3>Hero</h3>
//             <p><strong>Type:</strong> {page.hero?.type}</p>
//             {page.hero?.richText && (
//               <div>
//                 <h4>Rich Text:</h4>
//                 <p>{page.hero.richText.root.children.map((child, index) => (
//                   <span key={index}>{child.children?.map((text: { text: any; }) => text.text).join(' ')} </span>
//                 ))}</p>
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No pages found.</p>
//       )}
//     </div>
//   );
// };

// export default MyServerComponent;



// const MyServerComponent = async () => {
//   const res = await fetch(
//     "http://localhost:3000/api/pages/67bff21e732728a3c8afd6cc?depth=1&draft=false&locale=undefined",
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     return <p>Failed to load data</p>;
//   }

//   const data = await res.json();

//   // Function to extract text with line breaks
//   const extractTextWithBreaks = (children: any[]): (string | JSX.Element)[] => {
//     return children.flatMap((child, index) => {
//       if (child.type === "text") {
//         return child.text; 
//       } else if (child.type === "linebreak") {
//         return <br key={`br-${index}`} />; 
//       } else if (child.children) {
//         return extractTextWithBreaks(child.children); 
//       }
//       return "";
//     });
//   };

//   const textContent = extractTextWithBreaks(data.hero?.richText?.root?.children || []);
//   const mediaFilename = data.hero?.media?.filename || "No media found";

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
//       <h1>Extracted Text</h1>
//       <p>{textContent}</p>

//       <h1>Media Filename</h1>
//       <p>{mediaFilename}</p>

//       <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
//         {JSON.stringify(data, null, 2)}
//       </pre>
//     </div>
//   );
// };

// export default MyServerComponent;

// "use client"

// import { useEffect, useState } from "react";

// export default function DevOpsHero() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:3000/api/pages/67c6dab0cf35e909d739948f?depth=1&draft=false&locale=undefined")
//       .then((res) => res.json())
//       .then((data) => setData(data))
//       .catch((err) => console.error("Error fetching data:", err));
//   }, []);

//   if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//   const { hero, layout } = data;
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center text-center p-6">
//       {hero && (
//         <section className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
//           <h1 className="text-4xl font-bold text-gray-800">
//             {hero.richText.root.children[0].children.map((child, index) => (
//               <span key={index} className="block">
//                 {child.text}
//               </span>
//             ))}
//           </h1>
//           <p className="mt-4 text-gray-600">{hero.richText.root.children[1].children[0].text}</p>
//           {hero.media?.url && (
//             <img
//               src={`http://localhost:3000${hero.media.url}`}
//               alt="DevOps Hero"
//               className="mt-6 rounded-lg w-full h-auto"
//             />
//           )}
//         </section>
//       )}

//       {layout.map((block) => (
//         <section key={block.id} className="mt-8 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-3xl font-semibold text-gray-800">
//             {block.columns[0].richText.root.children[0].children.map((child, index) => (
//               <span key={index} className="block">
//                 {child.text}
//               </span>
//             ))}
//           </h2>
//         </section>
//       ))}
//     </div>
//   );
// }


// import { JSX } from "react";

// import config from '@payload-config';
// import { getPayload } from 'payload';
// import page from '../page';
// import { Key } from 'react';

// const MyServerComponent = async () => {
//   const payload = await getPayload({ config });

//   // Fetch pages collection
//   const collectionsData: Record<string, any[]> = {};
//   const pagesResult = await payload.find({ collection: 'pages' });
//   const result = await payload.find({ collection: 'posts' });

//    // ✅ Filter only pages where hero.type === 'devopsImpact'
//    const devopsImpactPages = pagesResult.docs.filter((page) => page.hero?.type === 'devopsImpact');

//   // Fetch all collections dynamically
//   for (const collection of (await config).collections) {
//     if (collection.slug) {
//       const result = await payload.find({ collection: collection.slug, limit: 100 }); // Fetch up to 100 records
//       collectionsData[collection.slug] = result.docs;
      
//     }
//   }

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
//       <h2 style={{ textAlign: 'center' }}>📦Posts</h2>
//        <ul>
//          {result.docs.map((post) => (
//            <li key={post.id}>{post.title}</li>
//          ))}
//        </ul>

//        <h2 style={{ textAlign: 'center' }}>📦Pages</h2>
//        <ul>
//          {pagesResult.docs.map((page) => (
//            <li key={page.id}>{page.title}</li>
//          ))}
//        </ul>

//        <h1 style={{ textAlign: 'center' }}>📦DevOps Impact Pages</h1>

//        {devopsImpactPages.length > 0 ? (
//          devopsImpactPages.map((page) => (
//            <div key={page.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//              {page.hero?.richText && (
//                <div>
//                  <p>{page.hero.richText.root.children.map((child, index) => (
//                    <span key={index}>{child.children?.map((text: { text: any; }) => text.text).join(' ')} </span>
//                  ))}</p>
//                </div>
//              )}
//            </div>
//          ))
//        ) : (
//          <p>No pages found with DevOps Impact hero.</p>
//        )}

//       {Object.entries(collectionsData).map(([collectionName, docs]) => (
//         <div key={collectionName} style={{ marginBottom: '30px' }}>
//           <h2 style={{ borderBottom: '2px solid #333' }}>📂 {collectionName}</h2>
//           {docs.length > 0 ? (
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//               {docs.map((doc) => (
//                 <li key={doc.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//                   <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
//                     {JSON.stringify(doc, null, 2)}
//                   </pre>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No records found.</p>
//           )}
//         </div>
//       ))}      
//     </div>
//   );
// };

// export default MyServerComponent;








// import config from '@payload-config';
// import { getPayload } from 'payload';

// const MyServerComponent = async () => {
//   const payload = await getPayload({ config });

//   // ✅ Fetch all collections dynamically
//   const collectionsData: Record<string, any[]> = {};

//   for (const collection of (await config).collections) {
//     if (collection.slug) {
//       const result = await payload.find({ collection: collection.slug, limit: 100 }); // Fetch up to 100 records
//       collectionsData[collection.slug] = result.docs;
//     }
//   }

//   return (
//     <div>
//       <h1>All Data from Payload CMS</h1>
//       {Object.entries(collectionsData).map(([collectionName, docs]) => (
//         <div key={collectionName}>
//           <h2>{collectionName}</h2>
//           <ul>
//             {docs.map((doc) => (
//               <li key={doc.id}>{JSON.stringify(doc)}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyServerComponent;
