import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig ={
    slug: 'comments',
    fields: [
        {
            name: 'content',
            type: 'text',
        },
        {
            name: 'author',
            type: 'group',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                },
                {
                    name: 'name',
                    type: 'email',
                }
            ]
        },
        {
            name: 'post',
            type: 'relationship',
            relationTo: 'posts'
        }
    ]
}