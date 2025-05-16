import {Button, Form, FormInstance, message, Space} from 'antd';

import {FormErrors} from "shared/hooks";
import {FormBody} from "entities/file-uploader/ui/form-body";

import {FileMeta, UploadFormType} from "../types";
import {useUploadFiles} from "../hooks";

type FormProps = {
    form: FormInstance;
    disabled: boolean;
    onValuesChange: () => void;
    resetForm: (params: Partial<{ resetDisabled: boolean; resetDirty: boolean }>) => void;
    errors: FormErrors<UploadFormType>| null;
}

const UploadForm = ({
                        form,
                        disabled,
                        onValuesChange,
                        resetForm,
                        errors
                    }: FormProps) => {
    const {upload} = useUploadFiles();

    const handleFinish = async (values: { tracks: FileMeta[] }) => {
        await upload(values.tracks, (progress, fileIndex) => {
            console.warn(`File ${fileIndex + 1}: ${progress}% uploaded`)
            message.success(`File ${fileIndex + 1}: ${progress}% uploaded`);
        });
        resetForm({resetDisabled: true});
    };

    const onDeleteFile = (file: FileMeta) => {
        const allTracks = form.getFieldValue('tracks') as Array<FileMeta>;
        form.setFieldValue('tracks', allTracks.filter(currTrack => currTrack !== file));
    };

    return <Form
        form={form}
        onValuesChange={onValuesChange}
        layout="vertical"
        initialValues={{tracks: []}}
        onFinish={handleFinish}
        style={{marginTop: 32}}
    >
        <Form.List name="tracks" rules={[
            {
                validator: async (_, tracks) => {
                    console.log(_, tracks)
                },
            }
        ]}>
            {(fields) => (
                <Space direction="vertical" size="large" style={{width: '100%'}}>
                    {fields.map(({key, name}) => {
                        const track = form.getFieldValue(['tracks', name]) || {};
                        return <FormBody key={key} track={track} name={name} onDeleteFile={onDeleteFile}
                                         alreadyExistError={errors?.errorFields.find(error => error.name.join('') === `tracks${name}alreadyExist`)}/>
                    })}
                </Space>
            )}
        </Form.List>

        {!disabled ? <Form.Item style={{marginTop: 24}}>
            <Button disabled={disabled} type="primary" htmlType="submit">
                Отправить
            </Button>
        </Form.Item> : null}
    </Form>
}

export default UploadForm;