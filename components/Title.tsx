import React from "react";

interface TitleProps {
    name: string;
    classname?: string;
}
const Title = ({ name, classname }: TitleProps) => {
    return <h3 className={`text-2xl font-bold mb-8 mt-0 ${classname}`}>{name}</h3>;
};

export default Title;
