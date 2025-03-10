// import config from '@payload-config';
// import { getPayload } from 'payload';

// const MyServerComponent = async () => {
//   const payload = await getPayload({ config });

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

//   const secondComponent = await payload.find({
//     collection: 'pages',
//     limit: 200, 
//     where: {
//       'layout.columns': { exists: true },
//       or: [
//         { title: { contains: 'home page 2nd component' } },  
//         { slug: { contains: 'home-page-2nd-component' } }   
//       ]
//     },
//   });

//   const thirdComponen = await payload.find({
//     collection: 'pages',
//     limit: 200, 
//     where: {
//       'layout.columns': { exists: true },
//       or: [
//         { title: { contains: 'home page 3nd component' } },  
//         { slug: { contains: 'home-page-3rd-components' } }   
//       ]
//     },
//   });

//   const forthComponen = await payload.find({
//     collection: 'pages',
//     limit: 200, 
//     where: {
   
//       or: [
//         { title: { contains: 'home page 4nd component' } },  
//         { slug: { contains: 'home-page-4th-component' } }   
//       ]
//     },
//   });

//   const fiveComponen = await payload.find({
//     collection: 'pages',
//     limit: 200, 
//     where: {
//       or: [
//         { title: { contains: 'home page 5th component' } },  
         
//       ]
//     },
//   });

// console.log("--------------------------------",fiveComponen)

//   return (

//     <>
//     <div className="min-h-screen bg-black flex flex-col items-center text-center p-6">
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
//           </div>
//         ))
//       ) : (
//         <p>No pages found.</p>
//       )}
//     </div>

//     <div className="container mx-auto px-4 py-12">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       {secondComponent.docs.length > 0 ? (
//         secondComponent.docs.map((page) => (
//           <div
//             key={page.id}
//           >
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

     
//     </div></div>

//     <div className="container mx-auto px-4 py-12">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       {thirdComponen.docs.length > 0 ? (
//         thirdComponen.docs.map((page) => (
//           <div
//             key={page.id}
//           >
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

     
//     </div></div>



//     {forthComponen.docs.length > 0 ? (
//         forthComponen.docs.map((page) => (
//           <div
//             key={page.id}
//           >
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


//                 {page.layout?.map((block, blockIndex) =>
//                   block.blockType === "mediaBlock" && block.media ? (
//                     <img
//                       key={blockIndex}
//                       src={`http://localhost:3000${block.media.url}`}
//                       alt="DevOps Hero"
//                       className="mt-6 rounded-lg w-full h-auto"
//                     />
//                   ) : null
//                 )}

//           </div>
//         ))
//       ) : (
//         <p>No pages found.</p>
//       )}
      
//       {fiveComponen.docs.length > 0 ? (
//         fiveComponen.docs.map((page) => (
//           <div
//             key={page.id}
//           >
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


//     </>
//   );
// };

// export default MyServerComponent;


import config from "@payload-config";
import { getPayload } from "payload";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";


const MyServerComponent = async () => {
  const payload = await getPayload({ config });

  const fetchPages = async (query: any) => {
    try {
      return await payload.find({ collection: "pages", limit: 200, where: query });
    } catch (error) {
      console.error("Error fetching pages:", error);
      return { docs: [] };
    }
  };

  const queries = [
    { or: [{ title: { contains: "hero"                    } }] },
    { or: [{ title: { contains: "home page 2nd component" } }] },
    { or: [{ title: { contains: "home page 3rd component" } }] },
    { or: [{ title: { contains: "home page 4th component" } }] },
    { or: [{ title: { contains: "home page 5th component" } }] },
  ];

  const [heroSection, secondComponent, thirdComponent, fourthComponent, fifthComponent] = await Promise.all(
    queries.map(fetchPages)
  );


  console.log('-------------------------fifthComponent',fifthComponent)

  // Reusable Component for Rendering Sections
  const RenderSection = ({ data }) => (
    <>
      {data.docs.length > 0 ? (
        data.docs.map((page: { id: Key | null | undefined; layout: any[]; }) => (
          <div key={page.id}>
            {page.layout?.map((block: { blockType: string; columns: any[]; }, blockIndex: any) =>
              block.blockType === "content"
                ? block.columns?.map((column: { richText: { root: { children: any[]; }; }; }, colIndex: any) =>
                    column.richText?.root?.children?.map((child: { children: any[]; }, childIndex: any) => (
                      <div key={`${blockIndex}-${colIndex}-${childIndex}`}>
                        {child.children?.map((text: { text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; type: string; }, textIndex: Key | null | undefined) => (
                          <span key={textIndex}>{text.text} {text.type === "linebreak" ? <br /> : " "}</span>
                        ))}
                      </div>
                    ))
                  )
                : null
            )}
          </div>
        ))
      ) : (
        <p>No pages found.</p>
      )}
    </>
  );

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center text-center p-6">
        {heroSection.docs.length > 0 ? (
          heroSection.docs.map((page) => (
            <section key={page.id} className="w-full max-w-4xl bg-black shadow-lg rounded-lg p-6">
              <h1 className="text-4xl font-bold text-gray-100">
                {page.hero?.richText?.root?.children?.[0]?.children?.map((child: { text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                  <span key={index} className="block">{child.text}</span>
                ))}
              </h1>
              <p>
                {page.hero?.richText?.root?.children?.[1]?.children?.map((child: { text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                  <span key={index} className="block">{child.text}</span>
                ))}
              </p>
              {page.hero?.media?.url && <img src={page.hero.media.url} alt="Hero Media" className="w-full h-auto" />}
            </section>
          ))
        ) : (
          <p>No hero sections found.</p>
        )}
      </div>

      

      {/* Render Remaining Sections */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RenderSection data={secondComponent} />
          <RenderSection data={thirdComponent} />
          <RenderSection data={fourthComponent} />
          <RenderSection data={fifthComponent} />
        </div>
      </div>

      {fourthComponent.docs.length > 0 ? (
         fourthComponent.docs.map((page) => (
           <div
             key={page.id}
           >

                 {page.layout?.map((block, blockIndex) =>
                   block.blockType === "mediaBlock" && block.media ? (
                     <img
                       key={blockIndex}
                       src={`http://localhost:3000${block.media.url}`}
                       alt="DevOps Hero"
                       className="mt-6 rounded-lg w-full h-auto"
                     />
                   ) : null
                 )}

           </div>
         ))
       ) : (
         <p>No pages found.</p>
       )}

    </>
  );
};

export default MyServerComponent;







