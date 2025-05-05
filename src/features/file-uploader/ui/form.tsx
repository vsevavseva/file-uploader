import {Button, Form, FormInstance, Space} from 'antd';
import {FileMeta} from "features/file-uploader/types";
import {FormBody} from "entities/file-uploader/ui/form-body";

type FormProps = {
    tracks: FileMeta[];
    onTrackAdded: unknown;
    form: FormInstance;
    disabled: boolean;
    onValuesChange: () => void;
    resetForm: () => void;

}

const UploadForm = ({
                        tracks, form,
                        disabled,
                        onValuesChange,
                        resetForm
                    }: FormProps) => {
    // const {upload} = useUploadFiles();

    const handleFinish = async (values: { tracks: FileMeta[] }) => {
        // await upload(values.tracks);
        alert(JSON.stringify(values.tracks));
        resetForm();
    };

    const onDeleteFile = (file: FileMeta) => {
        const allTracks = form.getFieldValue('tracks') as Array<FileMeta>;
        form.setFieldValue('tracks', allTracks.filter(currTrack => currTrack !== file));
    };

    return <Form
        form={form}
        onValuesChange={onValuesChange}
        layout="vertical"
        initialValues={{tracks}}
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

        {tracks.length ? <Form.Item style={{marginTop: 24}}>
            <Button disabled={disabled} type="primary" htmlType="submit">
                Отправить
            </Button>
        </Form.Item> : null}
    </Form>
}

export default UploadForm;