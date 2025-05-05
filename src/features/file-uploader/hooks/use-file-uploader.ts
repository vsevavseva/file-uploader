import {message, Upload, UploadProps} from "antd";
import {parseBlob} from "music-metadata";
import {useCallback, useRef} from "react";
import {SourceManager, FileManagerHandler} from "shared/utils/source-manager.ts";
import {FileMeta} from "features/file-uploader/types";

export const useFileUploader = () => {
    const fileManager = useRef(SourceManager<FileMeta>()).current;

    const subscribe = useCallback((callback: FileManagerHandler<FileMeta>) => {
        return fileManager.addListener('addFile', callback);
    }, [fileManager])

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        accept: 'audio/*',
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
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

                fileManager.emit('addFile', newFile);
            } catch (err) {
                console.error(err);
                message.error(`Ошибка при чтении "${file.name}"`);
            }

            return false;
        },
        customRequest({onSuccess}) {
            setTimeout(() => onSuccess && onSuccess("ok"), 0);
        },
        // fileList: files as never as UploadFile[],
        showUploadList: false,
    };


    return {uploadProps, subscribe};
}