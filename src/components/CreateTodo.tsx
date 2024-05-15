import { Container } from "@mui/material";
import MyForm from "./MyForm";

export default function CreateTodo() {

    return <>
        <Container component="main" maxWidth="xs">
            <MyForm />
        </Container>
    </>
}