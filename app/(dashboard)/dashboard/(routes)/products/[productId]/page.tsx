import Banner from "@/app/(dashboard)/_components/Banner";
import IconBadget from "@/app/(dashboard)/_components/IconBadget";
import ProductActions from "@/app/(dashboard)/dashboard/(routes)/products/[productId]/_components/ProductAction";
import ProductForm from "@/app/(dashboard)/dashboard/(routes)/products/[productId]/_components/ProductForm";
import { getServerCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const ProductIdPage = async ({ params }: { params: { productId: string } }) => {
    const { productId } = params;
    const user = await getServerCurrentUser();

    if (!user) {
        return (
            <div className="flex items-center justify-center py-20 italic">
                Unauthorized
            </div>
        );
    }

    const product = await db.product.findUnique({
        where: {
            id: params.productId,
            userId: user?.id,
        },
        include: {
            images: true,
            collections: true,
        },
    });

    if (!product) {
        return (
            <div className="flex items-center justify-center py-20 italic">
                Product not found
            </div>
        );
    }

    const requiredFields = [
        product.name,
        product.description,
        product.price,
        product.images.some((image) => image.imageUrl),
        product.collections.some((collection) => collection.name),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `${completedFields}/${totalFields}`;
    const isComplete = requiredFields.every(Boolean);

    return (
        <div>
            {!product.isPublished && (
                <Banner
                    variant="warning"
                    label="This product is not published. It will not be visible to customers."
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">Product Setup</h1>
                        <div className="text-sm text-slate-700">
                            Please complete all fieds ({completionText})
                        </div>
                    </div>
                    <div>
                        <ProductActions
                            disabled={!isComplete}
                            productId={productId}
                            isPublished={product.isPublished}
                        />
                    </div>
                </div>
                <ProductForm initialData={product} productId={product.id} />
            </div>
        </div>
    );
};

export default ProductIdPage;