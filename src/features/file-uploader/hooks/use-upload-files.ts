import {FileMeta} from "features/file-uploader/types";
import axios, {AxiosProgressEvent} from 'axios';

export const useUploadFiles = () => {
    const upload = async (
        tracks: Array<Omit<FileMeta, 'pictureUrl'>>,
        onProgress?: (progress: number, fileIndex: number) => void
    ) => {
        for (let i = 0; i < tracks.length; i++) {
            const {source, album, author, title} = tracks[i];
            const formData = new FormData();
            formData.append('file', source);
            formData.append('album', album);
            formData.append('artist', author);
            formData.append('title', title);

            try {
                await axios.post('http://localhost:5189/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                        if (progressEvent.total && onProgress) {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            onProgress(progress, i);
                        }
                    },
                });
            } catch (error) {
                console.error(`Upload error for file ${i + 1}:`, error);
                throw error;
            }
        }
    };

    return {upload};
};