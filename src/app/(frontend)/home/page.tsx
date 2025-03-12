"use client";
import React, { useEffect, useState } from "react";
export default function Home() {
  

  const getContent = (columnIndex: number, childIndex: number) => {
    return componentsData[4]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
      const contentBlock = page.layout?.[1];
      if (!contentBlock || contentBlock.blockType !== "content") return null;
  
      const column = contentBlock.columns?.[columnIndex];
      const firstLine = column?.richText?.root?.children?.[childIndex]?.children?.[0]?.text || "";
  
      return <span key={page.id}>{firstLine}</span>;
    });
  };
  
  const InternshipCard = () => (
    <>
      {Array.from({ length: 6 }).map((_, columnIndex) => (
        <div
          key={columnIndex}
          className="relative overflow-hidden rounded-lg border bg-black hover:shadow hover:shadow-teal-200 p-4"
        >
          <div className="flex flex-col rounded-md p-4">
            <h3 className="font-bold text-white">{getContent(columnIndex, 0)}</h3>
            <p className="text-sm text-gray-400 mt-2">{getContent(columnIndex, 1)}</p>
            <p className="text-xs text-gray-500 mt-2">
              <strong>Skills:</strong> {getContent(columnIndex, 2)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <strong>Tools:</strong> {getContent(columnIndex, 3)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <strong>Projects:</strong> {getContent(columnIndex, 4)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
  



  const HelpSectionCard = () => {
    if (!componentsData[2]?.docs?.length) {
      return <p>No hero sections found.</p>;
    }
  
    return componentsData[2].docs.map((page: { layout: any[]; id: React.Key }) => {
      const firstBlock = page.layout?.find((block: { blockType: string }) => block.blockType === "content");
  
      const columns = [1, 2, 3].map((index) => {
        const column = firstBlock?.columns?.[index];
        return {
          heading: column?.richText?.root?.children?.[0]?.children?.[0]?.text || "",
          firstLine: column?.richText?.root?.children?.[1]?.children?.[0]?.text || "",
        };
      });
  
      return (
        <div key={page.id}>
          {columns.map((col, idx) => (
            col.heading || col.firstLine ? ( 
              <div
                key={`${page.id}-${idx}`} 
                className="flex flex-col md:flex-row m-2 bg-gray-900 items-center py-4 px-4 md:px-10 lg:px-20 text-sm border-t-2 rounded-b shadow-sm border-green-500 hover:bg-gray-800 transition-colors duration-300"
              >
                <div className="ml-3 text-center md:text-left mt-3 md:mt-0">
                  <div className="text-2xl md:text-3xl text-gray-50">
                    <p>{col.heading}</p>
                    <div className="text-lg md:text-xl text-gray-300 mt-1">
                      <p>{col.firstLine}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          ))}
        </div>
      );
    });
  };
  
  
  const ExpectationListItem = () => {
    const indices = [2, 3, 4, 5, 6]; 
    return (
      <>
        {indices.map((index) => (
          <li key={index} className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {componentsData[1]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
              const contentBlock = page.layout?.[0];
              if (!contentBlock || contentBlock.blockType !== "content") return null;
  
              const firstColumn = contentBlock.columns?.[1];
              const firstLine = firstColumn?.richText?.root?.children?.[index]?.children?.[0]?.text || "";
  
              return <span key={page.id}>{firstLine}</span>;
            })}
          </li>
        ))}
      </>
    );
  };
  


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



  return (
    <>
    
    <div className=" flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden">

  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800 animate-pulse opacity-20"></div>


  <div className="relative z-10">
  {componentsData[0]?.docs?.length > 0 ? (
          componentsData[0].docs.map((page: { id: React.Key | null | undefined; hero: { richText: { root: { children: { children: { text: string; }[]; }[]; }; }; }; }) => (
            <section key={page.id} className="w-full max-w-4xl  p-6">
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
              {/* {page.hero?.media?.url && (
                <img src={page.hero.media.url} alt="Hero Media" className="w-full h-auto" />
              )} */}
            </section>
          ))
        ) : (
          <div className="relative flex justify-center items-center">
    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
    <img src="/devopsfarm-logo.png"  className="rounded-full h-28 w-28"/>
</div>
        )}
  </div>
</div>

<main className="pt-16 bg-clip-bg bg-transparent bg-logo-gradient">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
            {componentsData[1]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[0]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
            </h1>
            <p className="text-xl text-gray-400 mb-6">
            {componentsData[1]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
            const contentBlock = page.layout?.[0]; 
            if (!contentBlock || contentBlock.blockType !== "content") return null;

            const firstColumn = contentBlock.columns?.[0]; 
            const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
            
            return <span key={page.id}>{firstLine}</span>;
          })}
            </p>
            <a
              href="https://wa.link/manbm0"
              target="_blank"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Get in touch
            </a>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl text-gray-800 mb-4">
              {componentsData[1]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[0]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[1]; 
                const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
              </h3>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{componentsData[1]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
      const contentBlock = page.layout?.[0]; 
      if (!contentBlock || contentBlock.blockType !== "content") return null;

      const firstColumn = contentBlock.columns?.[1]; 
      const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
      
      return <span key={page.id}>{firstLine}</span>;
    })}</h2>
              <ul className="space-y-2 text-black mb-6">
                
                  <ExpectationListItem  />
               
              </ul>
              <div className="space-y-4">
                <a
                  target="_blank"
                  href="https://wa.link/manbm0"
                  className="block text-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Get Started
                </a>
                <a
                  target="_blank"
                  href="https://wa.link/manbm0"
                  className="block text-center border border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <div className="flex flex-col gap-3 pb-8 justify-center items-center px-4 sm:px-8 md:px-16 lg:px-40">
       
        <h1 className="text-4xl text-green-500 mb-4">
          {componentsData[2]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
            const firstBlock = page.layout?.find((block: { blockType: string; }) => block.blockType === "content");
            const firstColumn = firstBlock?.columns?.[0];
            const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || "";
            return <span key={page.id}>{firstLine}</span>; // Use <span> inside <h1>
          })}
        </h1>

        <p className="text-xl md:text-xl text-center text-gray-400 mb-6">
        {componentsData[2]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
            const firstBlock = page.layout?.find((block: { blockType: string; }) => block.blockType === "content");
            const firstColumn = firstBlock?.columns?.[0];
            const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || "";
            return <span key={page.id}>{firstLine}</span>; 
          })}
        </p>

        <HelpSectionCard />
      </div>



    <div className="bg-clip-bg  bg-transparent bg-logo-gradient text-white body-font">
    
    <>
    <div className="">
    <section
id="features"
className="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30"
>
<section className="w-full mx-auto py-10 text-white">
<div className="xl:w-[80%] sm:w-[85%] xs:w-[90%] mx-auto flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
  <div className="lg:w-[50%] w-full">
  {componentsData[3]?.docs?.length > 0 ? (
  componentsData[3].docs.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
    const secondMediaBlock = page.layout?.[1]; // Get the second mediaBlock

    return secondMediaBlock && secondMediaBlock.blockType === "mediaBlock" && secondMediaBlock.media ? (
      <div key={page.id}>
        <img
          src={`http://localhost:3000${secondMediaBlock.media.url}`}
          alt="DevOps Hero"
          className="w-full h-auto lg:rounded-t-lg sm:rounded-sm xs:rounded-sm"
        />
      </div>
    ) : null;
  })
) : (
  <div className="relative flex justify-center items-center">
  <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
  <img src="/devopsfarm-logo.png"  className="rounded-full h-28 w-28"/>
</div>
)}
   
 
  </div>
  <div className="lg:w-[50%] w-full text-gray-400 p-4 rounded-md">
    <h2 className="text-3xl font-semibold text-white">
    {componentsData[3]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
            const firstBlock = page.layout?.find((block: { blockType: string; }) => block.blockType === "content");
            const firstColumn = firstBlock?.columns?.[0];
            const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || "";
            return <span key={page.id}>{firstLine}</span>; 
          })}
    </h2>
    <p className="text-md mt-4 ">
    {componentsData[3]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
            const firstBlock = page.layout?.find((block: { blockType: string; }) => block.blockType === "content");
            const firstColumn = firstBlock?.columns?.[0];
            const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || "";
            return <span key={page.id}>{firstLine}</span>; 
          })}
    </p>
  </div>
</div>

<div className="xl:w-[80%] sm:w-[85%] xs:w-[90%] mx-auto flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
  <div className="w-full block md:hidden">
   
  {componentsData[3]?.docs?.length > 0 ? (
  componentsData[3].docs.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
    const secondMediaBlock = page.layout?.[2]; // Get the second mediaBlock

    return secondMediaBlock && secondMediaBlock.blockType === "mediaBlock" && secondMediaBlock.media ? (
      <div key={page.id}>
        <img
          src={`http://localhost:3000${secondMediaBlock.media.url}`}
          alt="DevOps Hero"
          className="w-full h-auto rounded-md"
        />
      </div>
    ) : null;
  })
) : (
  <div className="relative flex justify-center items-center">
    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
    <img src="/devopsfarm-logo.png"  className="rounded-full h-28 w-28"/>
</div>
)}
   
  </div>

  <div className="lg:w-[50%] w-full text-gray-400 p-4 rounded-md">
    <h2 className="text-3xl font-semibold text-white">
    {componentsData[3]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
      const contentBlock = page.layout?.[3]; 
      if (!contentBlock || contentBlock.blockType !== "content") return null;

      const firstColumn = contentBlock.columns?.[0]; 
      const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
      
      return <span key={page.id}>{firstLine}</span>;
    })}
    
    </h2>
    <p className="text-md mt-4 ">
    {componentsData[3]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
      const contentBlock = page.layout?.[3]; 
      if (!contentBlock || contentBlock.blockType !== "content") return null;

      const firstColumn = contentBlock.columns?.[0]; 
      const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
      
      return <span key={page.id}>{firstLine}</span>;
    })}
    </p>
  </div>

  <div className="w-full hidden md:block lg:w-[50%]">
    <img
      className="w-full h-auto rounded-md"
      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxNZW50b3J8ZW58MHwwfHx8MTcyMDIyNzU1Nnww&ixlib=rb-4.0.3&q=80&w=1080"
      alt="billboard image"
    />
  </div>
</div>
</section>


     
      <section className="container mx-auto px-4 space-y-6 py-8 md:py-12 lg:py-20">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{componentsData[4]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
      const contentBlock = page.layout?.[0]; 
      if (!contentBlock || contentBlock.blockType !== "content") return null;

      const firstColumn = contentBlock.columns?.[0]; 
      const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
      
      return <span key={page.id}>{firstLine}</span>;
    })}</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        {componentsData[4]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
      const contentBlock = page.layout?.[0]; 
      if (!contentBlock || contentBlock.blockType !== "content") return null;

      const firstColumn = contentBlock.columns?.[0]; 
      const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
      
      return <span key={page.id}>{firstLine}</span>;
    })}
        </p>
      </div>
      <div className="mx-auto grid justify-center  gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        
          <InternshipCard />
        
      </div>
    </section>


</section>

</div>
    </>

</div>
    </>
  );
}
