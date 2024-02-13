import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your authentication logic here
    console.log('Username:', username);
    console.log('Password:', password);
    navigate('/feed');
    // Example: You can send a request to your backend for authentication
  };

  return (
    <Card variant="outlined" style={{ maxWidth: 400, margin: '0 auto', marginTop: 50 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Login
        </Typography>
        <form onSubmit={(e) => {handleLogin(e)}}>
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
          <Button type="submit" variant="contained">
            Login
          </Button>
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
