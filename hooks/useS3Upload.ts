import { useState } from "react";
import { s3Api } from "@/lib/api/s3";

interface UseS3UploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

export const useS3Upload = ({ onSuccess, onError }: UseS3UploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);

      // 1. Get presigned URL from backend
      const { url: presignedUrl } = await s3Api.getPresignedUrl({
        key: `uploads/${Date.now()}-${file.name}`,
        type: "put",
        contentType: file.type,
      });

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
      const urlParts = presignedUrl.split("?")[0].split("/");
      const bucketName = urlParts[2].split(".")[0]; // Extract bucket name from presigned URL
      const fileKey = urlParts.slice(3).join("/"); // Get the full path after bucket name

      const publicUrl = `https://${bucketName}.s3.ap-northeast-2.amazonaws.com/${fileKey}`;

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
