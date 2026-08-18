import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
  // Accepts 'file' or 'void' and '=> void' means doesn't return anything
  onFileSelect?: (file: File | null) => void
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {

  // react-dropzone pkg
  const onDrop = useCallback( (acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null
    
    onFileSelect?.(file);
  }, [onFileSelect]);

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"]},
    maxSize: maxFileSize,
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border bg-neutral-950 text-white">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer flex flex-col items-center">
          {/* <img src="/icons/upload.png" alt="upload" className="size-10" /> */}

          {file ? (
            <div onClick={(e) => e.stopPropagation()}>
  
              <p className="text-sm text-white font-medium truncate">
                {file.name}
              </p>
              <p className="text-sm text-neutral-400">
                {formatSize(file.size)}
              </p>    
              <button
                type="button"
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onFileSelect?.(null)
                }}
              >
                <img src="/icons/close-btn.svg" alt="remove" className="w-4 h-4" />
              </button>
            </div>
            
          ) : (
            <div className="text-center">
              <p className="text-lg text-neutral-300">
                <span className="font-semibold">Choose a file</span> or drag it here
              </p>
              <p className="text-lg text-neutral-400">
                (Max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUploader
