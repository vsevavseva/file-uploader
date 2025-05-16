import React, {useEffect} from 'react';
import {InboxOutlined} from '@ant-design/icons';
import {Upload} from 'antd';

import {useForm} from "shared/hooks";

import {useFileUploader} from "../hooks";
import UploadForm from "./form";
import {FileMeta, UploadFormType} from "../types";

const {Dragger} = Upload;

export const FileUploader: React.FC = () => {
    const {uploadProps, subscribe} = useFileUploader();
    const {
        form,
        disabled,
        onValuesChange,
        resetForm,
        errors
    } = useForm<UploadFormType>({});

    useEffect(() => {
        const callback = (event: CustomEvent<FileMeta>) => {
            const currTracks = form.getFieldValue('tracks');
            currTracks.push(event.detail);
            form.setFieldValue('tracks', currTracks);
            onValuesChange();
            console.log(form.getFieldValue('tracks'))

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
                errors={errors}
            />
        </div>
    )
};
