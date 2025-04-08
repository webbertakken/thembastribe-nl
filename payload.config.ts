import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: "users",
    bundler: "vite",
  },
  editor: slateEditor({}),
  collections: [
    {
      slug: "pages",
      admin: {
        useAsTitle: "title",
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
        },
        {
          name: "content",
          type: "richText",
          required: true,
        },
        {
          name: "featuredImage",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "metaDescription",
          type: "textarea",
        },
      ],
    },
    {
      slug: "media",
      upload: {
        staticDir: path.resolve(__dirname, "public/media"),
        staticURL: "/media",
        imageSizes: [
          {
            name: "thumbnail",
            width: 400,
            height: 300,
            position: "centre",
          },
          {
            name: "card",
            width: 768,
            height: 1024,
            position: "centre",
          },
          {
            name: "hero",
            width: 1920,
            height: 1080,
            position: "centre",
          },
        ],
        mimeTypes: ["image/*"],
      },
      fields: [
        {
          name: "alt",
          type: "text",
          required: true,
        },
      ],
    },
    {
      slug: "puppies",
      admin: {
        useAsTitle: "name",
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "birthDate",
          type: "date",
          required: true,
        },
        {
          name: "gender",
          type: "select",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ],
          required: true,
        },
        {
          name: "status",
          type: "select",
          options: [
            { label: "Available", value: "available" },
            { label: "Reserved", value: "reserved" },
            { label: "Sold", value: "sold" },
          ],
          required: true,
        },
        {
          name: "description",
          type: "richText",
          required: true,
        },
        {
          name: "images",
          type: "array",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "caption",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "mongodb://localhost/themastribe",
  }),
});
