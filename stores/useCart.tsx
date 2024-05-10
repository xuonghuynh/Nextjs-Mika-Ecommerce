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
    orderInstruction: string;
    addToCart: (product: ProductWithImages) => void;
    removeCartItem: (product: Product) => void;
    updateQuantity: (product: Product, quantity: number) => void;
    addOrderInstruction: (instruction: string) => void;
    clearCart: () => void;
};

export const useCart = create<CartStoreProps>()(
    devtools(
        persist(
            (set, get) => ({
                cartItems: [],
                orderInstruction: "",
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
                updateQuantity: (product: Product, quantity: number) => {
                    set((state) => ({
                        cartItems: state.cartItems.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity }
                                : item
                        ),
                    }));
                },
                clearCart: () => {
                    set((state) => ({
                        cartItems: [],
                    }));
                },
                addOrderInstruction: (instruction: string) => {
                    set((state) => ({
                        orderInstruction: instruction,
                    }));
                }
            }),
            { name: "collection-storage" },
        ),
    ),
);
