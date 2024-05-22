import { Container } from "@mui/material";
import MyForm from "./MyForm";
import { useLocation } from "react-router-dom";
import { MyAppContext } from "../types";
import { UserContext } from "../context";
import { useContext } from "react";

export default function CreateTodo() {

    const applicationContext: MyAppContext = useContext<MyAppContext>(UserContext);
    const username = applicationContext.user.username;

    const location = useLocation();
    const data = location.state;

    return <>
        <Container component="main" maxWidth="xs">
            <MyForm edit={data?.edit} id={data?.id} userId={username} title={data?.title} description={data?.description} done={data?.done} photo={data?.photo} dueDate={data?.dueDate} />
        </Container>
    </>
}