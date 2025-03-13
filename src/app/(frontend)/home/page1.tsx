// "use client";
// import React, { useEffect, useState } from "react";
// import CustomerLogos from "../components/CustomerLogos";
// export default function Home() {


//   const ExpectationListItem = ({ text } : {text: string}) => (
//     <li className="flex items-center">
//       <svg
//         className="w-5 h-5 text-green-500 mr-2"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//       </svg>
//       {text}
//     </li>
//   );

//   const [data, setData] = useState();
//   const [data1, setData1] = useState();
//   const [data2, setData2] = useState();
//   const [data3, setData3] = useState();
//   const [data4, setData4] = useState();
//   const [loading, setLoading] = useState(true);
//   const [error, ] = useState();

  
//   useEffect(() => {
//     fetch("http://localhost:3000/api/pages/67c6dab0cf35e909d739948f?depth=1&draft=false&locale=undefined")
//       .then((res) => res.json())
//       .then((data) => setData(data))
//       .catch((err) => console.error("Error fetching data:", err));

//       fetch('/api/pages/67c6dab0cf35e909d7399483?depth=1&draft=false&locale=undefined')
//       .then((res) => res.json())
//       .then((data1) => setData1(data1))
//       .catch((err) => console.error("Error fetching data:", err));

//       fetch("/api/pages/67c00626df62ff13ba6f1734?depth=1&draft=false&locale=undefined")
//       .then((res) => res.json())
//       .then((result) => {
//         setData2(result);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });

//       fetch("/api/pages/67c974a912cad3bd2aa6466c?depth=1&draft=false&locale=undefined")
//       .then((response) => response.json())
//       .then((data3) => {
//         setData3(data3);
//         setLoading(false);
//       })
//       .catch((error) => console.error("Error fetching data:", error));

//       fetch("/api/pages/67c98d5a12cad3bd2aa64e2e?depth=1&draft=false&locale=undefined")
//       .then((res) => res.json())
//       .then((result) => {
//         setData4(result);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });


//   }, []);

//   if (!data || !data1 || loading ) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   if (!data3) return <div className="text-center text-lg text-red-500">Failed to load data</div>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;
//   const { hero } = data;
//   const contentBlocks = data1.layout[0]?.columns || [];


//   return (
//     <>


    
//     {/* <Herosection/> */}

//     <div className="min-h-screen bg-black flex flex-col items-center text-center p-6">
//       {hero && (
//         <section className="w-full max-w-4xl bg-black shadow-lg rounded-lg p-6">
//           <h1 className="text-4xl font-bold text-gray-100">
//             {hero.richText.root.children[0].children.map((child: { text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
//               <span key={index} className="block">
//                 {child.text}
//               </span>
//             ))}
//           </h1>
//           <p className="mt-4 text-gray-200">{hero.richText.root.children[1].children[0].text}</p>
//           {hero.media?.url && (
//             <img
//               src={`http://localhost:3000${hero.media.url}`}
//               alt="DevOps Hero"
//               className="mt-6 rounded-lg w-full h-auto"
//             />
//           )}
//         </section>
//       )}

//     </div>


//     <div className="container mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {contentBlocks.map((block: { richText: { root: { children: any[]; }; }; enableLink: any; link: { reference: { value: { slug: any; }; }; label: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; }, index: React.Key | null | undefined) => (
//           <div key={index} className="space-y-4">
//             {block.richText.root.children.map((child: { type: string; tag: string; children: { text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }[]; }, i: React.Key | null | undefined) => {
//               if (child.type === "heading" && child.tag === "h1") {
//                 return <h1 key={i} className="text-4xl font-bold text-gray-200">{child.children[0].text}</h1>;
//               }
//               if (child.type === "heading" && child.tag === "h3") {
//                 return <h3 key={i} className="text-xl font-semibold text-gray-200 italic">{child.children[0].text}</h3>;
//               }
//               if (child.type === "heading" && child.tag === "h2") {
//                 return <h2 key={i} className="text-2xl font-bold text-gray-300 mt-6">{child.children[0].text}</h2>;
//               }
//               if (child.type === "paragraph") {
//                 return <p key={i} className="text-gray-300">{child.children[0].text}</p>;
//               }
//               return null;
//             })}

//             {block.enableLink && (
//               <a 
//                 href={`/${block.link.reference.value.slug}`} 
//                 className="inline-block bg-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition"
//               >
//                 {block.link.label}
//               </a>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>


//     <div className="max-w-4xl mx-auto p-6">
//       {/* Hero Section */}
//       <section className="text-center mb-10">
//         {data2?.layout[0]?.columns[0]?.richText?.root?.children?.map((child, index) => (
//           <h1 key={index} className="text-3xl font-bold mb-4">{child.children[0].text}</h1>
//         ))}
//       </section>

//       {/* Layout Sections */}
//       <div className="space-y-8">
//         {data2?.layout[0]?.columns.map((column, index) => (
//           <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
//             {column.richText?.root?.children?.map((child, idx) => (
//               <p key={idx} className="text-lg text-gray-700 mb-2">{child.children[0].text}</p>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
    
    
//     <div className="container mx-auto p-6">
//       {data3.layout.map((block) => {
//         if (block.blockType === "content") {
//           return (
//             <div key={block.id} className="my-6">
//               {block.columns.map((column) => (
//                 <div key={column.id} className="mb-4">
//                   {column.richText.root.children.map((item, index) => (
//                     <div key={index}>
//                       {item.type === "heading" && (
//                         <h2 className="text-2xl font-bold mb-2">{item.children[0].text}</h2>
//                       )}
//                       {item.type === "paragraph" && (
//                         <p className="text-gray-700">{item.children[0].text}</p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           );
//         }
//         if (block.blockType === "mediaBlock") {
//           return (
//             <div key={block.id} className="my-6">
//               <img
//                 src={block.media.url}
//                 alt="Media"
//                 className="w-full h-auto rounded-lg shadow-md"
//               />
//             </div>
//           );
//         }
//         return null;
//       })}
//     </div>

//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-center text-gray-100 mb-4">
//         {data4.layout[0].columns[0].richText.root.children[0].children[0].text}
//       </h2>
//       <p className="text-center text-gray-100 mb-6">
//         {data4.layout[0].columns[0].richText.root.children[1].children[0].text}
//       </p>
//       <div className="grid md:grid-cols-3 gap-6">
//         {data4.layout[1].columns.map((column, index) => (
//           column.richText ? (
//             <div key={index} className=" p-4 shadow rounded-lg">
//               <h3 className="text-lg font-semibold text-gray-100">
//                 {column.richText.root.children[0].children[0].text}
//               </h3>
//               <p className="text-sm text-gray-600 mt-2">
//                 {column.richText.root.children[1].children[0].text}
//               </p>
//               <p className="text-sm font-medium mt-2">
//                 <span className="font-bold">Skills:</span> {column.richText.root.children[2].children[1].text}
//               </p>
//               <p className="text-sm font-medium mt-2">
//                 <span className="font-bold">Tools:</span> {column.richText.root.children[3].children[1].text}
//               </p>
//               <p className="text-sm font-medium mt-2">
//                 <span className="font-bold">Projects:</span> {column.richText.root.children[4].children[1].text}
//               </p>
//             </div>
//           ) : null
//         ))}
//       </div>
//     </div>

//     <div className="bg-clip-bg  bg-transparent bg-logo-gradient text-white body-font">
    
//     <>
//     <div className="">
//     <section
//       id="features"
//       className="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30"
//       >


// <div
//   className="absolute bottom-0 left-0 z-0 h-1/3 w-full border-b"
//   style={{
//     backgroundImage:
//       "linear-gradient(to right top, rgba(79, 70, 229, 0.2) 0%, transparent 50%, transparent 100%)",
//     borderColor: "rgba(92, 79, 240, 0.2)",
//   }}
// ></div>
// <div
//   className="absolute bottom-0 right-0 z-0 h-1/3 w-full"
//   style={{
//     backgroundImage:
//       "linear-gradient(to left top, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%)",
//     borderColor: "rgba(92, 79, 240, 0.2)",
//   }}
// ></div>
// <CustomerLogos/>
// </section>

// </div>
//     </>

// </div>
//     </>
//   );
// }
