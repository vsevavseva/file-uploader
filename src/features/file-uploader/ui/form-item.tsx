import {Card, Form, Image, Input} from "antd";
import {FileMeta} from "features/file-uploader/types";

type FormItemProps = {
    track: FileMeta;
    name: number;
}

const FormItem = ({track, name}: FormItemProps) => {
    return (
        <Card
            key={name}
            title={track.title || 'Трек'}
            cover={track.pictureUrl ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        src={track.pictureUrl}
                        alt="Обложка"
                        preview={false}
                        style={{maxHeight: 200, maxWidth: 200, objectFit: 'cover'}}
                    />
                </div>
            ) : null}
        >
            <Form.Item
                label="Название трека"
                name={[name, 'title']}
                rules={[{required: true, message: 'Введите название трека'}]}
            >
                <Input placeholder="Название трека"/>
            </Form.Item>
            <Form.Item
                label="Альбом"
                name={[name, 'album']}
                rules={[{required: true, message: 'Введите название альбома'}]}
            >
                <Input placeholder="Название альбома"/>
            </Form.Item>
            <Form.Item
                label="Исполнитель"
                name={[name, 'author']}
                rules={[{required: true, message: 'Введите исполнителя'}]}
            >
                <Input placeholder="Имя исполнителя"/>
            </Form.Item>
        </Card>
    );
};

export default FormItem;