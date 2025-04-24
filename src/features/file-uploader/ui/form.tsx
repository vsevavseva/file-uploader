import {useEffect} from 'react';
import {Form, Space} from 'antd';
import {FileMeta} from "features/file-uploader/types";
import FormItem from "features/file-uploader/ui/form-item.tsx";

type FormProps = {
    tracks: FileMeta[];
}

const UploadForm = ({tracks}: FormProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({"tracks": tracks})
    }, [tracks])

    return <Form
        form={form}
        layout="vertical"
        initialValues={{tracks}}
        style={{marginTop: 32}}
    >
        <Form.List name="tracks">
            {(fields) => (
                <Space direction="vertical" size="large" style={{width: '100%'}}>
                    {fields.map(({key, name}) => {
                        const track = form.getFieldValue(['tracks', name]) || {};
                        return <FormItem key={key} track={track} name={name}/>
                    })}
                </Space>
            )}
        </Form.List>
    </Form>
}

export default UploadForm;