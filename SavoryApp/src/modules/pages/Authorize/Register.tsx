import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
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
    const person = {username: username, email: email, password: password, img: [], bio: '', admin: false}
    fetch('http://localhost:8080/api/person/new', {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(person)
    }).then(() => {
      console.log('Registered ' + username);
      navigate(`/profile/${username}/edit`);
    });
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
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Register;
