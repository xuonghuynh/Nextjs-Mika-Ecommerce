import { Collection, Product, ProductImage } from "@prisma/client";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ProductWithImages = Product & { images: ProductImage[] } & {
    quantity: number;
    selectedColor?: string;
};

type CartStoreProps = {
    cartItems: ProductWithImages[];
    addToCart: (product: ProductWithImages) => void;
    removeCartItem: (product: Product) => void;
    clearCart: () => void;
};

export const useCart = create<CartStoreProps>()(
    devtools(
        persist(
            (set, get) => ({
                cartItems: [],
                addToCart: (product: ProductWithImages) => {
                    const currentCartItems = get().cartItems;
                    const existingItem = currentCartItems.find(
                        (item) => item.id === product.id,
                    );
                    if (existingItem) {
                        toast.error("Product already in cart");
                        return;
                    }
                    set((state) => ({
                        cartItems: [...state.cartItems, product],
                    }));
                    toast.success("Product added to cart");
                },
                removeCartItem: (product: Product) => {
                    set((state) => ({
                        cartItems: state.cartItems.filter(
                            (item) => item.id !== product.id,
                        ),
                    }));
                    toast.success("Product removed from cart");
                },
                clearCart: () => {
                    set((state) => ({
                        cartItems: [],
                    }));
                },
            }),
            { name: "collection-storage" },
        ),
    ),
);
