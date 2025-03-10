"use client";
import { useEffect, useState } from "react";

const MyClientComponent = () => {
  const [data, setData] = useState<any>(null);
  const [componentsData, setComponentsData] = useState<any[]>([]);

  const queries = [
    { or: [{ title: { contains: "hero" } }] },
    { or: [{ title: { contains: "home page 2nd component" } }] },
    { or: [{ title: { contains: "home page 3rd component" } }] },
    { or: [{ title: { contains: "home page 4th component" } }] },
    { or: [{ title: { contains: "home page 5th component" } }] },
  ];

  useEffect(() => {
    const fetchData = async (query?: any) => {
      try {
        const url = `/api/data?query=${encodeURIComponent(JSON.stringify(query))}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch data");
        return await res.json();
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    const fetchAllData = async () => {
      const initialData = await fetchData();
      setData(initialData);

      const results = await Promise.all(queries.map(fetchData));
      setComponentsData(results);
    };

    fetchAllData();
  }, []);

  const RenderSection = ({ data }) => (
    <>
      {data?.docs?.length > 0 ? (
        data.docs.map((page: { id: string; layout: any[] }) => (
          <div key={page.id}>
            {page.layout?.map((block: { blockType: string; columns: any[] }, blockIndex: number) =>
              block.blockType === "content"
                ? block.columns?.map((column: { richText: { root: { children: any[] } } }, colIndex: number) =>
                    column.richText?.root?.children?.map((child: { children: any[] }, childIndex: number) => (
                      <div key={`${blockIndex}-${colIndex}-${childIndex}`}>
                        {child.children?.map((text: { text: string; type: string }, textIndex: number) => (
                          <span key={textIndex}>
                            {text.text} {text.type === "linebreak" ? <br /> : " "}
                          </span>
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

  console.log("----------------------------",componentsData[2])

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center text-center p-6">
        {componentsData[0]?.docs?.length > 0 ? (
          componentsData[0].docs.map((page) => (
            <section key={page.id} className="w-full max-w-4xl bg-black shadow-lg rounded-lg p-6">
              <h1 className="text-4xl font-bold text-gray-100">
                {page.hero?.richText?.root?.children?.[0]?.children?.map(
                  (child: { text: string }, index: number) => (
                    <span key={index} className="block">
                      {child.text}
                    </span>
                  )
                )}
              </h1>
              <p>
                {page.hero?.richText?.root?.children?.[1]?.children?.map(
                  (child: { text: string }, index: number) => (
                    <span key={index} className="block">
                      {child.text}
                    </span>
                  )
                )}
              </p>
              {page.hero?.media?.url && (
                <img src={page.hero.media.url} alt="Hero Media" className="w-full h-auto" />
              )}
            </section>
          ))
        ) : (
          <p>No hero sections found.</p>
        )}
      </div>

      {/* <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {componentsData.slice(1).map((component, index) => (
            <RenderSection key={index} data={component} />
          ))}
        </div>
      </div> */}


      {/* {componentsData[1]?.docs?.length > 0 ? (
        componentsData[1].docs.map((page: { id: string; layout: any[] }) => (
            <div key={page.id}>
              {page.layout?.map((block: { blockType: string; columns: any[] }, blockIndex: number) =>
                block.blockType === "content"
                  ? block.columns?.map((column: { richText: { root: { children: any[1] } } }, colIndex: number) =>
                      column.richText?.root?.children?.map((child: { children: any[1] }, childIndex: number) => (
                        <div key={`${blockIndex}-${colIndex}-${childIndex}`}>
                          {child.children?.map((text: { text: string; type: string }, textIndex: number) => (
                            <span key={textIndex}>
                              {text.text} {text.type === "linebreak" ? <br /> : " "}
                            </span>
                          ))}
                        </div>
                      ))
                    )
                  : null
              )}
            </div>
          ))
        ) : (
            <p>No hero sections found.</p>
      )} */}


{/* 
{componentsData[1]?.docs?.length > 0 ? (
  componentsData[1].docs.map((page) => (
    <div key={page.id}>
      {page.layout?.map((block, blockIndex) =>
        block.blockType === "content"
          ? block.columns?.map((column, colIndex) =>
              column.richText?.root?.children?.map((child, childIndex) => (
                <div key={`${blockIndex}-${colIndex}-${childIndex}`}>
                  {child?.children?.map((text, textIndex) => (
                    <span key={textIndex}>
                      {text?.text} {text?.type === "linebreak" ? <br /> : " "}
                    </span>
                  ))}
                </div>
              ))
            )
          : null
      )}
    </div>
  ))
) : (
  <p>No hero sections found.</p>
)} */}



{/* {componentsData[2]?.docs?.length > 0 ? (
  componentsData[2].docs.map((page) => (
    <div key={page.id}>
      {page.layout?.map((block, blockIndex) =>
        block.blockType === "content"
          ? block.columns.map((column, colIndex) => {
              const firstLine =
                column.richText?.root?.children?.[0]?.children?.[0]?.text || "";
              return <p key={`${blockIndex}-${colIndex}`}>{firstLine}</p>;
            })
          : null
      )}
    </div>
  ))
) : (
  <p>No hero sections found.</p>
)} */}

<div className="flex flex-col gap-3 pb-8 justify-center items-center px-4 sm:px-8 md:px-16 lg:px-40">
        <h1 className="text-4xl text-green-500 mb-4">
          {componentsData[2]?.docs?.map((page) => {
            const firstBlock = page.layout?.find((block) => block.blockType === "content");
            const firstColumn = firstBlock?.columns?.[0];
            const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || "";
            return <span key={page.id}>{firstLine}</span>; 
          })}
        </h1>
      </div>

     



      {/* {componentsData[3]?.docs?.length > 0 ? (
        componentsData[3].docs.map((page) => (
          <div key={page.id}>
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
      )} */}
    </>
  );
};

export default MyClientComponent;




// "use client";
// import { useEffect, useState } from "react";

// const MyClientComponent = () => {
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`/api/data`);  
//         if (!res.ok) throw new Error("Failed to fetch data");
//         const jsonData = await res.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
  

//   return (
//     <div>
//       <h1>My Client Component with Server Data</h1>
//       {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
//     </div>
//   );
// };

// export default MyClientComponent;
