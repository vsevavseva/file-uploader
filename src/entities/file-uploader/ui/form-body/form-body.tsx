import {Card, Form, Image, Input} from "antd";
import {FileMeta} from "features/file-uploader/types";
import {FormBodyTitle} from "entities/file-uploader";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import {AutocompleteRelease} from "features/file-uploader/ui/autocomplete-release.tsx";
import {AutocompleteArtist} from "features/file-uploader/ui/autocomplete-artist.tsx";

type FormItemProps = {
    track: FileMeta;
    name: number;
    setFiles: (files: FileMeta[]) => void;
}

export const FormBody = ({track, name, setFiles}: FormItemProps) => {
    const form = useFormInstance();
    const onDeleteFile = () => {
        console.log(track)
        const allTracks = form.getFieldValue('tracks') as Array<FileMeta>;
        setFiles(allTracks.filter(currTrack => currTrack !== track));
        // console.log(allTracks, track)
    };

    return (
        <Card
            key={name}
            title={<FormBodyTitle title={track.title} onDelete={onDeleteFile} />}
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

        </Card>
    );
};

