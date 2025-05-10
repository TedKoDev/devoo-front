import { apiClient } from "./api-client";
import { z } from "zod";

export const presignedUrlSchema = z.object({
  key: z.string(),
  type: z.enum(["get", "put"]),
  contentType: z.string().optional(),
});

export type PresignedUrlDto = z.infer<typeof presignedUrlSchema>;

export interface PresignedUrlResponse {
  url: string;
  bucketName: string;
}

export const s3Api = {
  getPresignedUrl: (data: PresignedUrlDto): Promise<PresignedUrlResponse> => {
    return apiClient.post<PresignedUrlResponse>("/s3/presigned-url", data);
  },
};
