import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom'


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your authentication logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // Example: You can send a request to your backend for authentication
  };

  return (
    <Card variant="outlined" style={{ maxWidth: 400, margin: '0 auto', marginTop: 50 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to='/feed'><Button type="submit" variant="contained" color="primary">
            Login
          </Button></Link>
        </form>
        <br></br>
        <Typography>New User? <Link to='/register'>Register here.</Link></Typography>
        <Typography>
        Forgot your password? <Link to="/forgot-password">Reset it here</Link>.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Login;
