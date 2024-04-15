import Banner from "@/app/(landing)/_components/Banner";
import BlogAndEvent from "@/app/(landing)/_components/BlogAndEvent";
import Footer from "@/app/(landing)/_components/Footer";
import InfinityBrandName from "@/app/(landing)/_components/InfinityBrandName";
import MainFeature from "@/app/(landing)/_components/MainFeature";
import ProductShowcase from "@/app/(landing)/_components/ProductShowcase";

export default function Home() {
    return (
        <div>
            <Banner />
            <ProductShowcase />
            <MainFeature />
            <BlogAndEvent />
            <InfinityBrandName />
        </div>
    );
}
