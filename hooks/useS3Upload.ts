import { useState } from "react";

interface UseS3UploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

interface UploadResponse {
  url: string;
}

export const useS3Upload = ({ onSuccess, onError }: UseS3UploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);

      // 1. Get presigned URL from backend
      const presignedUrlResponse = await fetch("/api/s3/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: `uploads/${Date.now()}-${file.name}`,
          type: "put",
          contentType: file.type,
        }),
      });

      if (!presignedUrlResponse.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { url: presignedUrl } = (await presignedUrlResponse.json()) as UploadResponse;

      // 2. Upload file to S3 using presigned URL
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      // 3. Get the public URL of the uploaded file
      const fileKey = presignedUrl.split("?")[0].split("/").pop();
      const publicUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${fileKey}`;

      onSuccess?.(publicUrl);
      return publicUrl;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to upload image");
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error,
  };
};
