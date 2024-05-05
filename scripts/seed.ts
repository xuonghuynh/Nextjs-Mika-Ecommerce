const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.collection.createMany({
            data: [
                {
                    name: "Best seller",
                    description: "Best seller in this category",
                    image: "https://utfs.io/f/4397630e-8ca1-4353-b104-22b50c4c63ef-lcvxc0.webp",
                    slug: 'best-seller',
                    products: [],
                    userId: 'clvsdzyy40007mv53mhd3towz'
                },
                {
                    name: "Featured products",
                    description: "Featured products in this category",
                    image: "https://utfs.io/f/4397630e-8ca1-4353-b104-22b50c4c63ef-lcvxc0.webp",
                    slug: 'featured-products',
                    products: [],
                    userId: 'clvsdzyy40007mv53mhd3towz'
                },
                {
                    name: "New products",
                    description: "New products in this category",
                    image: "https://utfs.io/f/4397630e-8ca1-4353-b104-22b50c4c63ef-lcvxc0.webp",
                    slug: 'new-products',
                    products: [],
                    userId: 'clvsdzyy40007mv53mhd3towz'
                },
                {
                    name: "Over ear headphone",
                    description: "Over ear headphone in this category",
                    image: "https://utfs.io/f/4397630e-8ca1-4353-b104-22b50c4c63ef-lcvxc0.webp",
                    slug: 'over-ear-headphone',
                    products: [],
                    userId: 'clvsdzyy40007mv53mhd3towz'
                },
                {
                    name: "Plattan bluetooth",
                    description: "Plattan bluetooth in this category",
                    image: "https://utfs.io/f/4397630e-8ca1-4353-b104-22b50c4c63ef-lcvxc0.webp",
                    slug: 'plattan-bluetooth',
                    products: [],
                    userId: 'clvsdzyy40007mv53mhd3towz'
                },
                {
                    name: "Special produts",
                    description: "Special produts in this category",
                    image: "https://utfs.io/f/4397630e-8ca1-4353-b104-22b50c4c63ef-lcvxc0.webp",
                    slug: 'special-produts',
                    products: [],
                    userId: 'clvsdzyy40007mv53mhd3towz'
                },
                {
                    name: "Wireless heaphone",
                    description: "Wireless heaphone in this category",
                    image: "https://utfs.io/f/4397630e-8ca1-4353-b104-22b50c4c63ef-lcvxc0.webp",
                    slug: 'wireless-heaphone',
                    products: [],
                    userId: 'clvsdzyy40007mv53mhd3towz'
                }
            ]
        });
        console.log("Successfully seeded database collections");
    } catch (error) {
        console.log("Error while seeding database collections", error);
    } finally {
        await database.$disconnect();
    }
}

main();
