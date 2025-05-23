import {AutoComplete, Form} from "antd";
import {SearchType, useSearchedItem} from "../hooks";

type AutocompleteArtistProps = {
    name: number;
}

export const AutocompleteArtist = ({name}: AutocompleteArtistProps) => {
    const {options, onSearch} = useSearchedItem(SearchType.Artist);

    return <Form.Item
        label="Исполнитель"
        name={[name, 'author']}
        rules={[{required: true, message: 'Введите исполнителя'}]}
    >
        <AutoComplete options={options}
                      placeholder="Имя исполнителя" onSearch={onSearch}/>
    </Form.Item>
}