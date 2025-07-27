"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import useUploadFiles from "../../../hooks/useUploadFiles";

const MedicalRecords = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { uploadFiles } = useUploadFiles();
  const cleanupPreviewUrl = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  const handleModalClose = (open: boolean) => {
    if (!open) {
      cleanupPreviewUrl();
    }
    setShowModal(open);
  };

  useEffect(() => {
    return () => {
      cleanupPreviewUrl();
    };
  }, [cleanupPreviewUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesFromInput = e.target.files;
    if (!filesFromInput) return;

    const validFiles = Array.from(filesFromInput).filter((file) =>
      ["application/pdf", "image/png", "image/jpeg"].includes(file.type)
    );

    const combined = [...selectedFiles, ...validFiles];

    // Remove duplicates based on file.name + size
    const uniqueFilesMap = new Map<string, File>();
    for (const file of combined) {
      const key = file.name + file.size;
      if (!uniqueFilesMap.has(key)) {
        uniqueFilesMap.set(key, file);
      }
    }

    const uniqueFiles = Array.from(uniqueFilesMap.values()).slice(0, 5);
    setSelectedFiles(uniqueFiles);
  };

  const handleFileUpload = async () => {
    setUploading(true);
    const res = await uploadFiles(selectedFiles);
    setUploading(false);
    console.log(res);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    if (file.type === "application/pdf") {
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(url);
      setShowModal(true);
    }
  };

  const total = selectedFiles.length;
  const imageCount = selectedFiles.filter((f) =>
    f.type.startsWith("image/")
  ).length;
  const pdfCount = selectedFiles.filter(
    (f) => f.type === "application/pdf"
  ).length;

  return (
    <div className="w-full h-full p-6 shadow-md bg-transparent flex flex-col gap-6">
      <div>
        <h1 className="text-lg md:text-2xl font-semibold text-foreground">
          Patient Medical Records
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>
            Total Files: <strong className="text-foreground">{total}</strong>
          </span>
          <span>
            Image Files:{" "}
            <strong className="text-foreground">{imageCount}</strong>
          </span>
          <span>
            PDF Files: <strong className="text-foreground">{pdfCount}</strong>
          </span>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" disabled={total >= 5}>
              Upload New Files
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Prescriptions</DialogTitle>
            </DialogHeader>
            <Input
              type="file"
              accept=".pdf,image/*"
              className="cursor-pointer"
              multiple
              onChange={handleFilesChange}
              disabled={total >= 5}
            />
            <ul className="flex flex-col gap-3">
              {selectedFiles.length > 0 &&
                selectedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-muted px-4 py-2 rounded-lg cursor-pointer"
                    onClick={() => handlePreview(file)}
                  >
                    <span className="text-sm text-foreground truncate max-w-xs">
                      {file.name}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-destructive/10 transition-colors"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </li>
                ))}
            </ul>
            <Button
              variant="default"
              disabled={total >= 5 || uploading || selectedFiles.length === 0}
              onClick={handleFileUpload}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 w-full mt-6">
        {selectedFiles.length === 0 ? (
          <div className="flex justify-center items-center h-full text-muted-foreground text-center">
            No files uploaded yet. Start by uploading prescriptions above
          </div>
        ) : (
          <ul className="flex flex-col gap-3">hii</ul>
        )}
      </div>

      <Dialog open={showModal} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-lg">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicalRecords;
