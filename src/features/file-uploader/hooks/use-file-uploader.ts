import {message, Upload, UploadFile, UploadProps} from "antd";
import {parseBlob} from "music-metadata";
import {useState} from "react";
import {FileMeta} from "../types";

export const useFileUploader = () => {
    const [files, setFiles] = useState<Array<FileMeta>>([]);

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        accept: 'audio/*',
        onChange: async (info) => {
            console.log('onChange: ', info)
            if (info.fileList?.length === 0) setFiles([]);
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        // onRemove: (file) => {
        //     const index = files.findIndex(elem => JSON.stringify(elem.source) === JSON.stringify(file.originFileObj));
        //     const newFiles = files.slice();
        //     newFiles.splice(index, 1);
        //     setFiles(newFiles);
        // },
        beforeUpload: async (file: File) => {
            try {
                if (!file.type.startsWith('audio/')) {
                    message.error(`Файл "${file.name}" не является аудиофайлом`);
                    return Upload.LIST_IGNORE;
                }

                const data = await parseBlob(file as unknown as Blob);
                const {title = '', album = '', artist = '', picture} = data.common;

                let pictureUrl;
                if (picture?.length) {
                    const blob = new Blob([picture[0].data], {type: picture[0].format});
                    pictureUrl = URL.createObjectURL(blob);
                }

                const newFile = {
                    source: file,
                    title,
                    album,
                    author: artist,
                    pictureUrl
                };

                setFiles(prev => [...prev, newFile])
            } catch (err) {
                console.error(err);
                message.error(`Ошибка при чтении "${file.name}"`);
            }

            return false;
        },
        customRequest({onSuccess}) {
            setTimeout(() => onSuccess && onSuccess("ok"), 0);
        },
        fileList: files as never as UploadFile[],
        showUploadList: false,
    };


    return {uploadProps, files, setFiles};
}