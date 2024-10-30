import { signUp, signIn } from '../api/api.js'; 
describe('Auth API', () => {
  //Commence un bloc de description pour les tests de l'API d'authentification
  beforeEach(() => {
    jest.resetAllMocks();
  });
//Avant chaque test, réinitialise tous les mocks de Jest
  describe('signUp', () => {
    //Commence un bloc de description pour les tests de la fonction signUp
    it('should sign up successfully', async () => {
      //Définit un test pour vérifier si l'inscription réussit
      const userData = { email: 'test@example.com', password: 'password123' };
      const mockResponse = { message: 'Inscription réussie' };
//Prépare les données de test et la réponse simulée
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      );
//Remplace la fonction fetch globale par un mock qui simule une réponse réussie
      const response = await signUp(userData);
      expect(response).toEqual(mockResponse);
    });
//Appelle signUp et vérifie que la réponse correspond à la réponse simulée
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
