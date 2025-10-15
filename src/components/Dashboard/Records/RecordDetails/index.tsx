import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MoreHorizontal, Sparkles, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MedicalRecord, User } from "@/types/types";
import { RootState } from "@/redux/store/store";
import {
  useDeleteUserRecord,
  useUploadUserRecords,
} from "../../hooks/mutationHooks";
import { useUserRecords } from "../../hooks/dataHooks";
import CreativeChatInterface from "./AIChat";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

// Utility function to format file size
const formatBytes = (bytes: number, decimals = 2): string => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const RecordDetails = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [entity, setEntity] = useState<User | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
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
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(fileOrUrl);
        setShowPreviewModal(true);
      }
    } else {
      const url = URL.createObjectURL(fileOrUrl);
      if (fileOrUrl.type === "application/pdf") {
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } else {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
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
      <Drawer open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DrawerTrigger asChild>
          <Button
            size="icon"
            aria-label="Open AI Assistant"
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[90vh] mt-24 flex flex-col">
          <DrawerHeader className="text-left">
            <DrawerTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>AI Assistant</span>
            </DrawerTitle>
          </DrawerHeader>
          {/* 3. The Chat Interface is now rendered inside the Drawer */}
          {/* It fills the remaining space of the DrawerContent */}
          <div className="flex-1 overflow-hidden">
            <CreativeChatInterface entityId={entityId!} />
          </div>
        </DrawerContent>
      </Drawer>
      <div>
        <h1 className="text-lg md:text-2xl font-semibold text-foreground">
          {user?.role === "doctor" ? "Patient" : "Doctor"} Name:{" "}
          {entity?.firstName} {entity?.lastName}
        </h1>
        <div className="text-sm text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {entity?.role === "doctor" ? (
            <span>Specialization: {entity?.specialization}</span>
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
            Images: <strong className="text-foreground">{imageCount}</strong>
          </span>
          <span>
            PDFs: <strong className="text-foreground">{pdfCount}</strong>
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
              <DialogTitle>Upload Records</DialogTitle>
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
                    key={`${file.name}-${index}`}
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

      <div className="flex-1 w-full mt-2 border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recordsLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading records...
                </TableCell>
              </TableRow>
            ) : recordsError ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-destructive"
                >
                  Error loading records. Please try again.
                </TableCell>
              </TableRow>
            ) : recordList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No records have been uploaded yet.
                </TableCell>
              </TableRow>
            ) : (
              recordList.map((record: MedicalRecord) => (
                <TableRow
                  key={record._id}
                  className="cursor-pointer"
                  onClick={() => handlePreview(record.url)}
                >
                  <TableCell className="font-medium">
                    {record.fileName}
                  </TableCell>
                  <TableCell>
                    {record.fileType.includes("pdf") ? "PDF" : "Image"}
                  </TableCell>
                  <TableCell>
                    {record.uploadedBy._id === user?._id
                      ? "Me"
                      : `${entity?.firstName} ${entity?.lastName}`}
                  </TableCell>
                  <TableCell>{formatBytes(record.size)}</TableCell>
                  <TableCell>
                    {new Date(record.uploadedAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive focus:bg-destructive/10"
                          onSelect={() => handleDeleteFile(record._id)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showPreviewModal} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-2xl">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Record Preview"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecordDetails;
