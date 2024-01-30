import { cx } from 'class-variance-authority';
import { Fragment } from 'react';

import { Icon, Image, Progress } from '..';

interface ImageUploadProps {
  onChange: (file: File) => void;
  value?: string;
  isUploading?: boolean;
}

export const ImageUpload = ({ value, onChange, isUploading }: ImageUploadProps) => {
  return (
    <div className="relative">
      <input
        id="upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files !== null) {
            onChange(e.target.files[0]);
          }
        }}
      />
      {isUploading && (
        <Progress
          size="md"
          isIndeterminate
          className="absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 max-w-md"
        />
      )}
      <div
        id="image-preview"
        className={cx(
          'p-6 mb-4 bg-default-100 rounded-medium items-center mx-auto text-center cursor-pointer flex justify-center',
          value == null && 'border-dashed border-2 border-gray-400',
          isUploading && 'opacity-50 blur-sm',
        )}>
        {value == null ? (
          <Fragment>
            <label htmlFor="upload" className="cursor-pointer flex flex-col items-center">
              <Icon.UploadCloudIcon />
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                Upload picture
              </h5>
              <p className="font-normal text-sm ">
                Choose photo size should be less than <b className="text-gray-600">2mb</b>
              </p>
              <p className="font-normal text-sm ">
                and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.
              </p>
            </label>
          </Fragment>
        ) : (
          <label htmlFor="upload" className="cursor-pointer">
            <Image className="max-h-[200px]" src={value} />
          </label>
        )}
      </div>
    </div>
  );
};
