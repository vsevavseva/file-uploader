import axios from "axios";
import { Rule } from 'antd/es/form';

export const FileExistRule = (index: number): Rule => {
    return ({getFieldValue, setFieldValue}) => ({
        validator: async () => {
            const album = getFieldValue(['tracks', index, 'album']);
            const artist = getFieldValue(['tracks', index, 'author']);
            const title = getFieldValue(['tracks', index, 'title']);
            const extension = getFieldValue(['tracks', index, 'source'])?.name.split('.').at(-1);
            const path = `${album}/${artist}/${title}.${extension}`;

            if (!title || !artist || !album) return Promise.resolve();

            const response = await axios.get<void, {
                exists: boolean
            }>(`/check-file?path=${path}`, {});

            if (response.exists) {
                setFieldValue(['tracks', index, 'alreadyExist'], false);
                return Promise.resolve();
            }
            setFieldValue(['tracks', index, 'alreadyExist'], true);
            return Promise.reject(new Error('Данный файл уже загружен на сервер. Попробуйте удалить или изменить название'));
        },
    })
}