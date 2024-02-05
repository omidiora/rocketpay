// __tests__/Login.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios'; // Import axios to mock
import LoginScreen from '../LoginScreen';


jest.mock('axios'); // Mock Axios module

describe('Login Component', () => {
  it('should handle login with valid credentials', async () => {
    // Mock Axios post request to return a successful response
    axios.post.mockResolvedValueOnce({
      data: { token: 'fakeToken' },
    });

    const onLoginMock = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen  onLogin={onLoginMock} />
    );

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    // Set input values
    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpassword');

    // Trigger the login button press
    fireEvent.press(loginButton);

    // Wait for the async function to complete
    await waitFor(() => expect(onLoginMock).toHaveBeenCalledWith('fakeToken'));
  });

  it('should handle login with invalid credentials', async () => {
    // Mock Axios post request to return an error
    axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    const onLoginMock = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Login onLogin={onLoginMock} />
    );

    const email = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('Type here ');
    const loginButton = getByText('Login');

    // Set input values
    fireEvent.changeText(email, 'invaliduser');
    fireEvent.changeText(passwordInput, 'invalidpassword');

    // Trigger the login button press
    fireEvent.press(loginButton);

    // Wait for the async function to complete
    await waitFor(() =>
      expect(getByText('Invalid credentials')).toBeTruthy()
    );
  });
});
