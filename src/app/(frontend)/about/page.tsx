"use client";
import { IconBrandInstagram, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
const MyClientComponent = () => {
  const [data, setData] = useState<any>(null);
  const [componentsData, setComponentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const queries = [
    // { or: [{ title: { contains: "hero" } }] },
    // { or: [{ title: { contains: "home page 2nd component" } }] },
    // { or: [{ title: { contains: "home page 3rd component" } }] },
    // { or: [{ title: { contains: "home page 4th component" } }] },
    // { or: [{ title: { contains: "home page 5th component" } }] },
    { or: [{ title: { contains: "About1" } }] },
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
      setLoading(true);
      const results = await Promise.all(queries.map(fetchData));
      setComponentsData(results);
      setLoading(false);
    };
    fetchAllData();
  }, []);



  const TeamMember = () => {
    const teamIndexes = [15, 16, 17, 18, 19, 20, 21]; 
   
    const getTextFromMediaBlock = (mediaBlock: any) => {
      return mediaBlock.media?.caption?.root?.children?.[0]?.children?.[0]?.text || "";
    };

    const getTextFromMediaBlock1 = (mediaBlock: any) => {
      return mediaBlock.media?.caption?.root?.children?.[1]?.children?.[0]?.text || "";
    };
    
    

    return (
      <div className="flex flex-wrap">
        {teamIndexes.map((index) => (
          <div key={index} className="w-full md:w-6/12 lg:w-3/12 px-6 mb-6">
            <div className="flex flex-col items-center">
            {componentsData[0]?.docs?.length > 0 &&
              componentsData[0].docs.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const mediaBlock = page.layout?.[index];
                if (
                  mediaBlock &&
                  mediaBlock.blockType === "mediaBlock" &&
                  mediaBlock.media
                ) {
                  return (
                    <div key={page.id}>
                      <Image
                        width={200}
                        height={200}
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-80 rounded-2xl object-cover drop-shadow-md hover:drop-shadow-xl transition duration-200"
                        src={`http://localhost:3000${mediaBlock.media.url}`}
                        alt="Team Member"
                      />
                      <div className="text-gray-100 font-bold mt-2">
                        {getTextFromMediaBlock(mediaBlock)}<br/>
                        {getTextFromMediaBlock1(mediaBlock)}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
              <div className="text-center mt-4">
                <h2 className="text-gray-100 text-xl font-bold"></h2>
                <p className="text-gray-300 font-light mb-2"></p>
                <div className="flex space-x-3 opacity-50 hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href="#"
                    target="_blank"
                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-indigo-50"
                  >
                    <IconBrandLinkedin />
                  </Link>
                  <Link
                    href="#"
                    target="_blank"
                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-blue-50"
                  >
                    <IconBrandX />
                  </Link>
                  <Link
                    href="#"
                    target="_blank"
                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-orange-50"
                  >
                    <IconBrandInstagram />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  


  return (
    <>

<div className="relative pt-20 scroll-auto">
     
        <div  className="sticky top-0 min-h-screen flex items-center justify-center text-white bg-black">
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 px-4 py-10 lg:py-20">
            {/* Image First */}
            
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative h-60 sm:h-80 md:h-96 w-full max-w-lg">
                 
                {componentsData[0]?.docs?.length > 0 ? (
                  componentsData[0].docs.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                    const secondMediaBlock = page.layout?.[1]; 

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
              </div>
            

            <div className="w-full lg:w-1/2 p-6 shadow-xl rounded-xl text-center ">
              <h2 className="text-3xl md:text-4xl text-green-400 font-bold mb-4">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[0]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 text-justify">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[0]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </p>
            </div>    
          </div>
        </div>


        <div  className="sticky top-0 min-h-screen flex items-center justify-center text-white bg-black">
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 px-4 py-10 lg:py-20">
            {/* Image First */}
            
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative h-60 sm:h-80 md:h-96 w-full max-w-lg">
                 
                {componentsData[0]?.docs?.length > 0 ? (
                  componentsData[0].docs.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                    const secondMediaBlock = page.layout?.[3]; 

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
              </div>
            

            <div className="w-full lg:w-1/2 p-6 shadow-xl rounded-xl text-center ">
              <h2 className="text-3xl md:text-4xl text-green-400 font-bold mb-4">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[2]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 text-justify">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[2]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </p>
            </div>    
          </div>
        </div>

        <div  className="sticky top-0 min-h-screen flex items-center justify-center text-white bg-black">
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 px-4 py-10 lg:py-20">
            {/* Image First */}
            
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative h-60 sm:h-80 md:h-96 w-full max-w-lg">
                 
                {componentsData[0]?.docs?.length > 0 ? (
                  componentsData[0].docs.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                    const secondMediaBlock = page.layout?.[5]; 

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
              </div>
            

            <div className="w-full lg:w-1/2 p-6 shadow-xl rounded-xl text-center ">
              <h2 className="text-3xl md:text-4xl text-green-400 font-bold mb-4">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[4]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 text-justify">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[4]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </p>
            </div>    
          </div>
        </div>


        <div  className="sticky top-0 min-h-screen flex items-center justify-center text-white bg-black">
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 px-4 py-10 lg:py-20">
            {/* Image First */}
            
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative h-60 sm:h-80 md:h-96 w-full max-w-lg">
                 
                {componentsData[0]?.docs?.length > 0 ? (
                  componentsData[0].docs.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                    const secondMediaBlock = page.layout?.[7]; 

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
              </div>
            

            <div className="w-full lg:w-1/2 p-6 shadow-xl rounded-xl text-center ">
              <h2 className="text-3xl md:text-4xl text-green-400 font-bold mb-4">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[6]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 text-justify">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[6]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </p>
            </div>    
          </div>
        </div>

        <div  className="sticky top-0 min-h-screen flex items-center justify-center text-white bg-black">
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 px-4 py-10 lg:py-20">
            {/* Image First */}
            
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative h-60 sm:h-80 md:h-96 w-full max-w-lg">
                 
                {componentsData[0]?.docs?.length > 0 ? (
                  componentsData[0].docs.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                    const secondMediaBlock = page.layout?.[9]; 

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
              </div>
            

            <div className="w-full lg:w-1/2 p-6 shadow-xl rounded-xl text-center ">
              <h2 className="text-3xl md:text-4xl text-green-400 font-bold mb-4">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[8]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 text-justify">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[8]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </p>
            </div>    
          </div>
        </div>

        <div  className="sticky top-0 min-h-screen flex items-center justify-center text-white bg-black">
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 px-4 py-10 lg:py-20">
            {/* Image First */}
            
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative h-60 sm:h-80 md:h-96 w-full max-w-lg">
                 
                {componentsData[0]?.docs?.length > 0 ? (
                  componentsData[0].docs.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                    const secondMediaBlock = page.layout?.[11]; 

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
              </div>
            

            <div className="w-full lg:w-1/2 p-6 shadow-xl rounded-xl text-center ">
              <h2 className="text-3xl md:text-4xl text-green-400 font-bold mb-4">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[10]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 text-justify">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[10]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </p>
            </div>    
          </div>
        </div>


        <div  className="sticky top-0 min-h-screen flex items-center justify-center text-white bg-black">
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 px-4 py-10 lg:py-20">
            {/* Image First */}
            
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative h-60 sm:h-80 md:h-96 w-full max-w-lg">
                 
                {componentsData[0]?.docs?.length > 0 ? (
                  componentsData[0].docs.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                    const secondMediaBlock = page.layout?.[13]; 

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
              </div>
            

            <div className="w-full lg:w-1/2 p-6 shadow-xl rounded-xl text-center ">
              <h2 className="text-3xl md:text-4xl text-green-400 font-bold mb-4">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[12]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 text-justify">
              {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[12]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
                </p>
            </div>    
          </div>
        </div>

    </div>

    <div className="relative bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-6">
          {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[14]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[0]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
          </h1>
          <p className="text-lg font-light mb-12">
          {componentsData[0]?.docs?.map((page: { layout: any[]; id: React.Key | null | undefined; }) => {
                const contentBlock = page.layout?.[14]; 
                if (!contentBlock || contentBlock.blockType !== "content") return null;

                const firstColumn = contentBlock.columns?.[0]; 
                const firstLine = firstColumn?.richText?.root?.children?.[1]?.children?.[0]?.text || ""; 
                
                return <span key={page.id}>{firstLine}</span>;
              })}
          </p>
          <div className="flex flex-wrap justify-center">
          <TeamMember />
          </div>
        </div>
      </div>


    </>
  );
};

export default MyClientComponent;


