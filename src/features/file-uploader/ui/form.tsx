import {useEffect} from 'react';
import {Button, Form, Space} from 'antd';
import {FileMeta} from "features/file-uploader/types";
import {useForm} from "shared/hooks";
import {FormBody} from "entities/file-uploader/ui/form-body";

type FormProps = {
    tracks: FileMeta[];
    setFiles: (p: never[]) => void;
}

const UploadForm = ({tracks, setFiles}: FormProps) => {
    const {
        form,
        disabled,
        onValuesChange,
        resetForm,
    } = useForm<FormProps>({});

    // const {upload} = useUploadFiles();

    useEffect(() => {
        form.setFieldsValue({"tracks": tracks});
        onValuesChange();
    }, [tracks])

    const handleFinish = async (values: { tracks: FileMeta[] }) => {
        // await upload(values.tracks);
        alert(JSON.stringify(values.tracks));
        setFiles([]);
        resetForm();
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
                        return <FormBody key={key} track={track} name={name} setFiles={setFiles}/>
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