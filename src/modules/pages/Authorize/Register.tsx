// Registration.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string>('')

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validatePassword(value);
  }

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{10,})/;
    if (!regex.test(value)) {
      setPasswordError('Password must contain at least one capital letter, one special character, and be at least 10 characters long.');
    } else {
      setPasswordError('');
    }
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordError) {
        alert('Please enter a valid password.');
        return;
      }
    // Handle registration logic
    console.log('Registering with:', username, email, password);
  };

  return (
    <Card variant="outlined" style={{ maxWidth: 400, margin: '0 auto', marginTop: 50 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <Link to='/profile/edit'><Button type="submit" variant="contained" color="primary">
            Register
          </Button></Link>
        </form>
      </CardContent>
    </Card>
  );
}

export default Register;
