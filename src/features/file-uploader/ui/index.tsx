import React, {useEffect} from 'react';
import {InboxOutlined} from '@ant-design/icons';
import {Upload} from 'antd';
import {useFileUploader} from "features/file-uploader/hooks";
import UploadForm from "features/file-uploader/ui/form.tsx";
import {FileMeta} from "features/file-uploader/types";
import {useForm} from "shared/hooks";

const {Dragger} = Upload;

type FormProps = {
    tracks: FileMeta[];
    onTrackAdded: unknown;
}

export const FileUploader: React.FC = () => {
    const {uploadProps, subscribe} = useFileUploader();
    const {
        form,
        disabled,
        onValuesChange,
        resetForm,
    } = useForm<FormProps>({});

    useEffect(() => {
        const callback = (event: CustomEvent<FileMeta>) => {
            const currTracks = form.getFieldValue('tracks');
            currTracks.push(event.detail);
            form.setFieldValue('tracks', currTracks);
            onValuesChange();
        }
        const unsubscribe = subscribe(callback);
        return () => {
            unsubscribe?.();
        };
    }, [subscribe])

    return (
        <div style={{padding: '20px'}}>
            <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>

            <UploadForm
                form={form}
                disabled={disabled}
                onValuesChange={onValuesChange}
                resetForm={resetForm}
            />
        </div>
    )
};
