import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import React from "react";

type ProductRatingProps = {
    value: number;
    onChange: (value: number) => void;
    className? : string
};

const ProductRating = ({ value, onChange, className }: ProductRatingProps) => {
    return (
        <Rating
            className={`${className}`}
            itemStyles={{
                itemShapes: ThinRoundedStar,
                activeFillColor: "#f59e0b",
                inactiveFillColor: "#CCCCCC",
            }}
            style={{ maxWidth: 80 }}
            value={value}
            onChange={(value: number) => onChange(value)}
        />
    );
};

export default ProductRating;
