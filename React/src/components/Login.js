import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

export class Login extends Component {

    handleSuccessfulLogin = (username) => {
        console.log(this.props);
        this.props.appLogin(username);
        this.props.history.push("/home");
    }

    autenticar = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const url = 'http://localhost:8080/tpo/login?user=' + username + '&password=' + event.target.password.value;
        fetch(url)
            .then((res) => res.json()).then((json) => {
                if (json == true) {
                    this.handleSuccessfulLogin(username);
                } else {
                    alert(json.message);
                    console.log(json);
                }
            }
        );
    }

    render() {
        return (
            <Form className="col-lg-5 no-padding-left" onSubmit={this.autenticar}>
                <h2 className="mb-3">Login</h2>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username"/>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
            </Form>
        )
    }
}

export default withRouter(Login)