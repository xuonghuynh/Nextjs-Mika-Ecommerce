import React from "react";
import { FaBatteryThreeQuarters } from "react-icons/fa";
import { features } from "@/data/static-data/main-feature";
import { IconType } from "react-icons";
import { Button } from "@/components/ui/button";

type FeatureProps = {
    id: string;
    title: string;
    icon: IconType;
};

const MainFeature = () => {
    return (
        <div className="w-full bg-[url(/banner2.webp)] bg-cover bg-center bg-no-repeat py-[120px]">
            <div className="container flex items-center justify-end">
                <div>
                    <div className="font-hind text-[40px] font-bold">
                        Main Features
                    </div>
                    <div className="mt-5 flex flex-col gap-x-4 gap-y-6">
                        {features.map(
                            ({ id, title, icon: Icon }: FeatureProps) => (
                                <div
                                    key={id}
                                    className="flex items-center gap-x-4"
                                >
                                    <Icon className="h-[22px] w-[22px] text-main" />
                                    <span className="text-[22px]">{title}</span>
                                </div>
                            ),
                        )}
                    </div>
                    <Button
                        className="mt-10 rounded-full px-10 py-6"
                        variant={"primaryOrange"}
                    >
                        Shop Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MainFeature;
