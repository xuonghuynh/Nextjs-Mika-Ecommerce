import React from "react";

interface TitleProps {
    name: string;
}
const Title = ({ name }: TitleProps) => {
    return <h3 className="text-2xl font-bold mb-8 mt-0">{name}</h3>;
};

export default Title;
