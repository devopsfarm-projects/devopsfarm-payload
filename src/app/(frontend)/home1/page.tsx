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







