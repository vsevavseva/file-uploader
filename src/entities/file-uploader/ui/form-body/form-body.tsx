import {Alert, Card, Form, Image, Input} from "antd";
import {FileMeta} from "features/file-uploader/types";
import {FormBodyTitle} from "entities/file-uploader";
import {AutocompleteRelease} from "features/file-uploader/ui/autocomplete-release.tsx";
import {AutocompleteArtist} from "features/file-uploader/ui/autocomplete-artist.tsx";
import {FileExistRule} from "entities/file-uploader/utils";

interface ErrorField {
    name: (string | number)[];
    errors: string[];
}

type FormItemProps = {
    track: FileMeta;
    name: number;
    onDeleteFile: (file: FileMeta) => void;
    alreadyExistError?: ErrorField;
}

export const FormBody = ({track, name, onDeleteFile, alreadyExistError}: FormItemProps) => {
    const onDelete = () => {
        onDeleteFile(track);
    };

    return (
        <Card
            key={name}
            title={<FormBodyTitle title={track.title} onDelete={onDelete}/>}
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

            <AutocompleteRelease name={name}/>
            <AutocompleteArtist name={name}/>

            <Form.Item
                label="alreadyExist"
                name={[name, 'alreadyExist']}
                style={{display: 'none'}}
                noStyle
                dependencies={[['tracks', name, 'title'], ['tracks', name, 'album'], ['tracks', name, 'artist']]}
                shouldUpdate={false}
                rules={[FileExistRule(name)]}
            >
                <div style={{display: 'none'}}/>
            </Form.Item>

            {alreadyExistError && (
                <Alert
                    message={alreadyExistError.errors[0]}
                    type="error"
                    showIcon
                    style={{marginTop: 8}}
                />
            )}
        </Card>
    );
};

