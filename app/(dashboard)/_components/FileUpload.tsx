'use client';

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
    className?: string
}

export const FileUpload = ({
    onChange,
    endpoint,
    className
}: FileUploadProps) => {
    return (
        <UploadDropzone
            className={className}
            endpoint={endpoint}
            onClientUploadComplete={(res) => onChange(res?.[0].url)}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}