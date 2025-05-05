import {AutoComplete, Form} from "antd";
import {useSearchedArtist} from "features/file-uploader/hooks/use-searched-artist.ts";

type AutocompleteArtistProps = {
    name: number;
}

export const AutocompleteArtist = ({name}: AutocompleteArtistProps) => {
    const {results, onSearch} = useSearchedArtist();

    return <Form.Item
        label="Исполнитель"
        name={[name, 'author']}
        rules={[{required: true, message: 'Введите исполнителя'}]}
    >
        <AutoComplete options={Array.from(new Set(results?.map(el => (el.title)))).map(el => ({label: el, value: el}))}
                      placeholder="Имя исполнителя" onSearch={onSearch}/>
    </Form.Item>
}