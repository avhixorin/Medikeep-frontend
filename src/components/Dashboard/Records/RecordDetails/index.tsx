import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { User } from "@/types/types";
import { useParams } from "react-router-dom";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import {
  useDeleteUserRecord,
  useUploadUserRecords,
} from "../../hooks/mutationHooks";
import { useUserRecords } from "../../hooks/dataHooks";
import { AiChatModal } from "./SearchResults";

const RecordDetails = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [entity, setEntity] = useState<User | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const { entityId } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);

  const { mutate: uploadRecords, isPending: isUploading } =
    useUploadUserRecords();
  const { mutate: deleteRecord, isPending: isDeleting } = useDeleteUserRecord();

  const doctorId: string | undefined =
    user?.role === "doctor" ? user?._id ?? undefined : entityId ?? undefined;
  const patientId: string | undefined =
    user?.role === "doctor" ? entityId ?? undefined : user?._id ?? undefined;

  const {
    data: records,
    isLoading: recordsLoading,
    error: recordsError,
  } = useUserRecords({ doctorId, patientId });

  const getEntityData = useCallback(
    (id: string) => {
      if (!user) return null;
      if (user.role === "doctor" && user.patients) {
        return user.patients.find((pat) => pat._id === id);
      } else if (user.doctors) {
        return user.doctors.find((doc) => doc._id === id);
      }
    },
    [user]
  );

  useEffect(() => {
    if (entityId) {
      const entityData = getEntityData(entityId);
      if (entityData) {
        setEntity(entityData);
      }
    }
  }, [entityId, getEntityData]);
  const recordList = Array.isArray(records) ? records : [];
  const total = recordList?.length ?? 0;

  const imageCount =
    recordList?.filter((f) => f.fileType.startsWith("image/")).length ?? 0;
  const pdfCount =
    recordList?.filter((f) => f.fileType === "application/pdf").length ?? 0;

  const handleFileUpload = () => {
    if (!entityId) {
      console.error("Target entity ID is missing!");
      return;
    }
    uploadRecords(
      { files: selectedFiles, target: entityId },
      {
        onSuccess: () => {
          setSelectedFiles([]);
          setShowModal(false);
        },
      }
    );
  };

  const handleDeleteFile = (id: string) => {
    deleteRecord(id);
  };

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
    setShowPreviewModal(open);
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

  const handlePreview = (fileOrUrl: File | string) => {
    if (typeof fileOrUrl === "string") {
      if (fileOrUrl.endsWith(".pdf")) {
        window.open(fileOrUrl, "_blank");
      } else {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(fileOrUrl);
        setShowPreviewModal(true);
      }
    } else {
      const url = URL.createObjectURL(fileOrUrl);
      if (fileOrUrl.type === "application/pdf") {
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } else {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(url);
        setShowPreviewModal(true);
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full h-full p-6 shadow-md bg-transparent flex flex-col gap-6">
      <AiChatModal entityId={entityId!} />
      <div>
        <h1 className="text-lg md:text-2xl font-semibold text-foreground">
          {user?.role === "doctor" ? "Patient" : "Doctor"} Name:{" "}
          {entity?.firstName} {entity?.lastName}
        </h1>
        <div className="text-sm text-muted-foreground mt-2 flex gap-3">
          {entity?.role === "doctor" ? (
            <>
              <span>Specialization: {entity?.specialization}</span>
            </>
          ) : (
            <>
              <span>Age: {entity?.dateOfBirth}</span>
              <span>
                Sex: {entity?.gender === "female" ? "Female" : "Male"}
              </span>
              <span>Email: {entity?.email}</span>
            </>
          )}
        </div>
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
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <Button variant="default" disabled={isUploading || !entity}>
              Upload New Files
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Prescriptions</DialogTitle>
            </DialogHeader>
            <Input
              type="file"
              accept=".pdf,image/png,image/jpeg"
              className="cursor-pointer"
              multiple
              onChange={handleFilesChange}
              disabled={selectedFiles.length >= 5}
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
              disabled={isUploading || selectedFiles.length === 0}
              onClick={handleFileUpload}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 w-full mt-6">
        {recordsLoading ? (
          <div className="flex justify-center items-center h-full text-muted-foreground text-center">
            Loading records...
          </div>
        ) : recordsError ? (
          <div className="flex justify-center items-center h-full text-destructive text-center">
            Error loading records. Please try again.
          </div>
        ) : entity && records?.length === 0 ? (
          <div className="flex justify-center items-center h-full text-muted-foreground text-center">
            No available {user?.role === "Doctor" ? "doctors" : "patients"}{" "}
            record. Start uploading prescriptions and records to view them here.
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {records &&
              records.length > 0 &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              records.map((record: any) => (
                <li
                  key={record._id}
                  className="flex items-center justify-between bg-muted px-4 py-2 rounded-lg cursor-pointer"
                  onClick={() => handlePreview(record.url)}
                >
                  <span className="text-sm text-foreground truncate max-w-xs">
                    {record.fileName}
                  </span>
                  <span className="text-sm text-foreground truncate max-w-xs">
                    {record.fileType}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile(record._id);
                    }}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </li>
              ))}
          </ul>
        )}
      </div>
      <Dialog open={showPreviewModal} onOpenChange={handleModalClose}>
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

export default RecordDetails;
