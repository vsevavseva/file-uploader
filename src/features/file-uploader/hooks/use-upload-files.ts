import {FileMeta} from "features/file-uploader/types";

export const useUploadFiles = () => {
    const upload = async (tracks: Array<Omit<FileMeta, 'pictureUrl'>>) => {
        const formData = new FormData();
        tracks.forEach(({source, album, author, title}, index) => {
            formData.append(`file[${index}]`, source);
            formData.append(`album[${index}]`, album);
            formData.append(`artist[${index}]`, author);
            formData.append(`title[${index}]`, title);
        });

        try {
            const response = await fetch('http://localhost:5189/save', {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    return {upload};
}