import {AutoComplete, Form} from "antd";
import {SearchType, useSearchedItem} from "../hooks";

type AutocompleteReleaseProps = {
    name: number;
}

export const AutocompleteRelease = ({name}: AutocompleteReleaseProps) => {
    const {options, onSearch} = useSearchedItem(SearchType.Release);

    return <Form.Item
        label="Альбом"
        name={[name, 'album']}
        rules={[{required: true, message: 'Введите название альбома'}]}
    >
        <AutoComplete options={options}
                      placeholder="Название альбома" onSearch={onSearch}/>
    </Form.Item>
}