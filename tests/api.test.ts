import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApiClient } from '../src/api/client';

describe('ApiClient', () => {
  let client: ApiClient;
  let fetchMock: any;

  beforeEach(() => {
    client = new ApiClient('http://localhost:3001/api');
    fetchMock = vi.fn();
    global.fetch = fetchMock;
    localStorage.clear();
  });

  describe('GET request', () => {
    it('makes successful GET request', async () => {
      const responseData = { id: '1', name: 'Luna' };
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => responseData,
      });

      const result = await client.get('/pets/1');

      expect(result.ok).toBe(true);
      expect(result.status).toBe(200);
      expect(result.data).toEqual(responseData);
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3001/api/pets/1',
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('handles failed GET request', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ message: 'Pet not found' }),
      });

      const result = await client.get('/pets/999');

      expect(result.ok).toBe(false);
      expect(result.status).toBe(404);
      expect(result.error).toBe('Pet not found');
    });
  });

  describe('POST request', () => {
    it('makes successful POST request with body', async () => {
      const body = { name: 'Luna', species: 'dog' };
      const responseData = { id: '1', ...body };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => responseData,
      });

      const result = await client.post('/pets', body);

      expect(result.ok).toBe(true);
      expect(result.status).toBe(201);
      expect(result.data).toEqual(responseData);

      const callArgs = fetchMock.mock.calls[0];
      expect(callArgs[0]).toBe('http://localhost:3001/api/pets');
      expect(callArgs[1].method).toBe('POST');
      expect(callArgs[1].body).toBe(JSON.stringify(body));
    });
  });

  describe('PUT request', () => {
    it('makes successful PUT request', async () => {
      const body = { name: 'Luna Updated' };
      const responseData = { id: '1', ...body };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => responseData,
      });

      const result = await client.put('/pets/1', body);

      expect(result.ok).toBe(true);
      expect(result.status).toBe(200);
      expect(result.data).toEqual(responseData);

      const callArgs = fetchMock.mock.calls[0];
      expect(callArgs[1].method).toBe('PUT');
    });
  });

  describe('DELETE request', () => {
    it('makes successful DELETE request', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 204,
        json: async () => null,
      });

      const result = await client.delete('/pets/1');

      expect(result.ok).toBe(true);
      expect(result.status).toBe(204);

      const callArgs = fetchMock.mock.calls[0];
      expect(callArgs[1].method).toBe('DELETE');
    });
  });

  describe('Auth headers', () => {
    it('includes auth token in headers when available', async () => {
      localStorage.setItem(
        'auth_state',
        JSON.stringify({ token: 'test-token-123' })
      );

      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
      });

      await client.get('/pets');

      const callArgs = fetchMock.mock.calls[0];
      expect(callArgs[1].headers.Authorization).toBe('Bearer test-token-123');
    });

    it('excludes auth header when no token', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
      });

      await client.get('/pets');

      const callArgs = fetchMock.mock.calls[0];
      expect(callArgs[1].headers.Authorization).toBeUndefined();
    });
  });

  describe('Error handling', () => {
    it('handles network error', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      const result = await client.get('/pets');

      expect(result.ok).toBe(false);
      expect(result.status).toBe(0);
      expect(result.error).toBe('Network error');
    });

    it('handles invalid JSON response', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      const result = await client.get('/pets');

      expect(result.ok).toBe(true);
      expect(result.status).toBe(200);
      expect(result.data).toBeNull();
    });
  });
});
