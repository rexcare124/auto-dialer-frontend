"use client";

import type { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DownloadIcon, RefreshCwIcon, UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const addSchema = z.object({
  phone_number: z.string().min(1, "Phone number is required"),
  note: z.string().optional(),
});

const uploadSchema = z.object({
  file: z
    .instanceof(File, { message: "CSV file is required" })
    .refine((f) => f.name.toLowerCase().endsWith(".csv"), "Must be a .csv file"),
});

export function DashboardHeaderActions({
  setPage,
  onRefetch,
  onDownloadCsv,
  onAddOne,
  onUploadCsv,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  onRefetch: () => void;
  onDownloadCsv: () => void;
  onAddOne: (body: { phone_number: string; note?: string }) => Promise<boolean>;
  onUploadCsv: (file: File) => Promise<boolean>;
}) {
  const addForm = useForm<z.infer<typeof addSchema>>({
    resolver: zodResolver(addSchema),
    defaultValues: { phone_number: "", note: "" },
  });

  const uploadForm = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={onRefetch}>
        <RefreshCwIcon className="mr-2 size-4" />
        Refetch
      </Button>

      <Button variant="outline" onClick={onDownloadCsv}>
        <DownloadIcon className="mr-2 size-4" />
        Download CSV
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Add number</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add phone number</DialogTitle>
            <DialogDescription>Add one phone number at a time.</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={addForm.handleSubmit(async (values) => {
              const ok = await onAddOne(values);
              if (ok) {
                addForm.reset();
                setPage(1);
                onRefetch();
              }
            })}
          >
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone number</Label>
              <Input id="phone_number" placeholder="+14155551234" {...addForm.register("phone_number")} />
              {addForm.formState.errors.phone_number ? (
                <p className="text-sm text-destructive">{addForm.formState.errors.phone_number.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <Textarea id="note" placeholder="batch A" {...addForm.register("note")} />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={addForm.formState.isSubmitting}>
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <UploadIcon className="mr-2 size-4" />
            Upload CSV
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file (multipart/form-data field name: <span className="font-mono">file</span>).
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={uploadForm.handleSubmit(async (values) => {
              const ok = await onUploadCsv(values.file);
              if (ok) {
                uploadForm.reset();
                setPage(1);
                onRefetch();
              }
            })}
          >
            <div className="space-y-2">
              <Label htmlFor="file">CSV file</Label>
              <Input
                id="file"
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadForm.setValue("file", f, { shouldValidate: true });
                }}
              />
              {uploadForm.formState.errors.file ? (
                <p className="text-sm text-destructive">{uploadForm.formState.errors.file.message}</p>
              ) : null}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={uploadForm.formState.isSubmitting}>
                Upload
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

