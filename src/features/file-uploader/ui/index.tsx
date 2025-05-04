import React from 'react';
import {InboxOutlined} from '@ant-design/icons';
import {Upload} from 'antd';
import {useFileUploader} from "features/file-uploader/hooks";
import UploadForm from "features/file-uploader/ui/form.tsx";

const {Dragger} = Upload;

export const FileUploader: React.FC = () => {
    const {uploadProps, files, setFiles} = useFileUploader();

    return (
        <div style={{padding:'20px'}}>
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

            <UploadForm tracks={files} setFiles={setFiles}/>
        </div>
    )
};
