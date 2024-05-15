'use client'
import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { TbTruckDelivery } from "react-icons/tb";
import { MdCreditScore, MdOutlineShoppingCartCheckout  } from "react-icons/md";
import { BsFillBagCheckFill } from "react-icons/bs";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { ClipboardCheck, PackageCheck } from "lucide-react";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 136deg, rgb(255,188,125) 0%, rgb(255,151,54) 50%, rgb(255,122,0) 100%)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 136deg, rgb(255,188,125) 0%, rgb(255,151,54) 50%, rgb(255,122,0) 100%)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundImage: "linear-gradient( 136deg, rgb(255,188,125) 0%, rgb(255,151,54) 50%, rgb(255,122,0) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
        backgroundImage: "linear-gradient( 136deg, rgb(255,188,125) 0%, rgb(255,151,54) 50%, rgb(255,122,0) 100%)",
    }),
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <ClipboardCheck />,
        2: <MdCreditScore className="h-6 w-6" />,
        3: <MdOutlineShoppingCartCheckout className="h-6 w-6"  />,
        4: <TbTruckDelivery className="h-6 w-6" />,
        5: <PackageCheck  className="h-6 w-6" />,
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = [
    "Order Placed",
    "Payment Confirmed",
    "Order Processed",
    "In Transit",
    "Delivered",
];

export default function CustomizedSteppers() {
    return (
        <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={2}
                connector={<ColorlibConnector />}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}
