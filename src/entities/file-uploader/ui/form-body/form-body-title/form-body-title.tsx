import {DeleteOutlined} from "@ant-design/icons";
import {StyledFormBodyTitle} from "./styled-form-body-title.ts";

type FormItemTitleProps = {
    title: string;
    onDelete: () => void;
}

export const FormBodyTitle = ({title, onDelete}: FormItemTitleProps) => {
    return <StyledFormBodyTitle>
        <div>{title}</div>
        <DeleteOutlined onClick={onDelete} />
    </StyledFormBodyTitle>
};