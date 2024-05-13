import { Collection, Product, ProductImage } from "@prisma/client";
import { stat } from "fs";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ProductWithImages = Product & { images: ProductImage[] };

type WishListStoreProps = {
    wishlistItems: ProductWithImages[];
    addToWishList: (product: ProductWithImages) => void;
    removeWishList: (product: Product) => void;
};

export const useWishlist = create<WishListStoreProps>()(
    devtools(
        persist(
            (set, get) => ({
                wishlistItems: [],
                addToWishList: (product: ProductWithImages) => {
                    const currentCartItems = get().wishlistItems;
                    const existingItem = currentCartItems.find(
                        (item) => item.id === product.id,
                    );
                    if (existingItem) {
                        set((state) => ({
                            wishlistItems: state.wishlistItems.filter(
                                (item) => item.id !== product.id,
                            ),
                        }));
                        toast.success("Product removed from wishlist");
                        return;
                    }
                    set((state) => ({
                        wishlistItems: [...state.wishlistItems, product],
                    }));
                    toast.success("Product added to wishlist");
                },
                removeWishList: (product: Product) => {
                    set((state) => ({
                        wishlistItems: state.wishlistItems.filter(
                            (item) => item.id !== product.id,
                        ),
                    }));
                    toast.success("Product removed from wishlist");
                },
            }),
            { name: "wishlist-storage" },
        ),
    ),
);
