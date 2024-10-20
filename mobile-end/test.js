import { signUp, signIn } from './api/api.js'; 
describe('Auth API', () => {
  
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('signUp', () => {
    it('should sign up successfully', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const mockResponse = { message: 'Inscription réussie' };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      );

      const response = await signUp(userData);
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error on failed sign up', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const mockErrorResponse = { error: 'Email déjà utilisé' };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockErrorResponse),
        })
      );

      await expect(signUp(userData)).rejects.toThrow('Email déjà utilisé');
    });

    it('should handle network errors', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };

      global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));

      await expect(signUp(userData)).rejects.toThrow('Erreur lors de l\'inscription');
    });
  });

  describe('signIn', () => {
    it('should sign in successfully', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const mockResponse = { token: 'abcd1234' };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      );

      const response = await signIn(email, password);
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error on failed sign in', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const mockErrorResponse = { error: 'Identifiants incorrects' };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockErrorResponse),
        })
      );

      await expect(signIn(email, password)).rejects.toThrow('Identifiants incorrects');
    });

    it('should handle network errors', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));

      await expect(signIn(email, password)).rejects.toThrow("Erreur lors de la connexion (api): Network Error");
    });
  });
});
