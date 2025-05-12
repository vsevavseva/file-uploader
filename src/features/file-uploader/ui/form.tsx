import {Button, Form, FormInstance, message, Space} from 'antd';
import {FileMeta} from "features/file-uploader/types";
import {FormBody} from "entities/file-uploader/ui/form-body";
import {useUploadFiles} from "features/file-uploader/hooks";

type FormProps = {
    form: FormInstance;
    disabled: boolean;
    onValuesChange: () => void;
    resetForm: (params: { resetDisabled: boolean; resetDirty?: boolean }) => void;
}

const UploadForm = ({
                        form,
                        disabled,
                        onValuesChange,
                        resetForm
                    }: FormProps) => {
    const {upload} = useUploadFiles();

    const handleFinish = async (values: { tracks: FileMeta[] }) => {
        await upload(values.tracks, (progress, fileIndex) => {
            message.success(`File ${fileIndex + 1}: ${progress}% uploaded`);
        });
        resetForm({resetDisabled: true });
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
        <Form.List name="tracks">
            {(fields) => (
                <Space direction="vertical" size="large" style={{width: '100%'}}>
                    {fields.map(({key, name}) => {
                        const track = form.getFieldValue(['tracks', name]) || {};
                        return <FormBody key={key} track={track} name={name} onDeleteFile={onDeleteFile}/>
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