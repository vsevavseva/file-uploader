import {AutoComplete, Form} from "antd";
import {useSearchedArtist} from "features/file-uploader/hooks/use-searched-release.ts";

type AutocompleteReleaseProps = {
    name: number;
}

export const AutocompleteRelease = ({name}: AutocompleteReleaseProps) => {
    const {options, onSearch} = useSearchedArtist();

    return <Form.Item
        label="Альбом"
        name={[name, 'album']}
        rules={[{required: true, message: 'Введите название альбома'}]}
    >
        <AutoComplete options={options}
                      placeholder="Название альбома" onSearch={onSearch}/>
    </Form.Item>
}