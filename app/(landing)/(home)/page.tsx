import Banner from "@/app/(landing)/_components/Banner";
import MainFeature from "@/app/(landing)/_components/MainFeature";
import Navbar from "@/app/(landing)/_components/Navbar";
import ProductShowcase from "@/app/(landing)/_components/ProductShowcase";
import Image from "next/image";

export default function Home() {
    return <div>
        <Navbar />
        <Banner />
        <ProductShowcase />
        <MainFeature />
    </div>;
}
