import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, X, Check } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (base64Image: string) => void;
  selectedImage?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, selectedImage }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, JPEG, PNG).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image file is too large. Please upload an image under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelected(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      
      {/* Hidden inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {selectedImage ? (
        /* Image Preview Box */
        <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md bg-slate-900 group">
          <img
            src={selectedImage}
            alt="Uploaded Crop Foliage"
            className="w-full h-64 sm:h-72 object-cover"
          />

          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-slate-800 font-semibold text-xs py-2 px-4 rounded-lg shadow-md hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <ImageIcon className="w-4 h-4 text-emerald-700" />
              <span>Replace Photo</span>
            </button>
            <button
              onClick={() => onImageSelected('')}
              className="bg-red-600 text-white font-semibold text-xs py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors flex items-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </div>

          <div className="absolute bottom-3 left-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Leaf Photo Attached</span>
          </div>
        </div>
      ) : (
        /* Uploader Drag Area */
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-emerald-500 bg-emerald-50/80 scale-[0.99]'
              : 'border-slate-300 bg-slate-50/50 hover:border-emerald-400 hover:bg-emerald-50/30'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h4 className="text-base font-bold text-slate-900 mb-1 font-heading">
            Upload clear photo of affected leaf or crop
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
            Drag and drop your crop photo here, or browse from device files. Supports JPG, JPEG, PNG up to 10MB.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="btn-primary text-xs py-2 px-4"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Browse Files</span>
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click(); }}
              className="btn-secondary text-xs py-2 px-4"
            >
              <Camera className="w-4 h-4 text-emerald-800" />
              <span>Take Photo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
