export const useUploadFile = () => {
  const uploadFile = async (file: File) => {
    const res = await fetch('/api/aws/upload', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    });

    const { url, fields } = await res.json();

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('file', file);

    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (uploadResponse.ok) {
      const filenameUrl = encodeURIComponent(file.name);
      return { url: `${url}${filenameUrl}`, error: undefined };
    } else {
      return { error: 'Something went wrong uploading the image', url: undefined };
    }
  };

  return {
    upload: uploadFile,
  };
};
