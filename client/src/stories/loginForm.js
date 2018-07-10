import React from "react";
import { storiesOf } from "@storybook/react";
import LoginForm from "../components/LoginForm";
import { Container } from "reactstrap";
import "../containers/Login/Login.css";

storiesOf("LoginForm", module).add("Login Form", () => 
    <Container className="login-container">
        <LoginForm />
    </Container>
);