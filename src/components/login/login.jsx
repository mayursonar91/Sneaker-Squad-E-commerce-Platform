import React, { useState } from 'react';
import { Button, Form, Card, Spinner } from 'react-bootstrap';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.status === "Ok") {
        window.location.href = '/';
      } else {
        setError("Invalid LoginId or Password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const gotoRegisterPage = () => {
    window.location.href = '/register';
  };

  return (
    <div className="login">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Button className="register-btn mb-3" onClick={gotoRegisterPage}>Register</Button>
          {error && <p className="text-danger">{error}</p>}
          <Form className='login-form' onSubmit={handleLogin}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
