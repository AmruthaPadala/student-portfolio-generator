const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

const getAuthToken = () => {
  return localStorage.getItem('portfolio_auth_token');
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('portfolio_auth_token', token);
  } else {
    localStorage.removeItem('portfolio_auth_token');
  }
};

const request = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(
        data?.message || data?.error || `Request failed with status ${response.status}`
      );
      error.status = response.status;
      error.validationErrors = data?.validationErrors;
      throw error;
    }

    return data?.data !== undefined ? data.data : data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to connect to the backend server. Please verify it is running on port 8080.');
    }
    throw err;
  }
};

export const api = {
  // Authentication
  auth: {
    login: (credentials) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    register: (userData) =>
      request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    me: () => request('/auth/me'),
  },

  // Student Profile
  profile: {
    get: () => request('/profile'),
    update: (profileData) =>
      request('/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),
  },

  // Education
  education: {
    getAll: () => request('/education'),
    getById: (id) => request(`/education/${id}`),
    create: (data) =>
      request('/education', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      request(`/education/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      request(`/education/${id}`, {
        method: 'DELETE',
      }),
  },

  // Skills
  skills: {
    getAll: (category) =>
      request(category ? `/skills?category=${category}` : '/skills'),
    create: (data) =>
      request('/skills', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      request(`/skills/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      request(`/skills/${id}`, {
        method: 'DELETE',
      }),
  },

  // Projects
  projects: {
    getAll: () => request('/projects'),
    getById: (id) => request(`/projects/${id}`),
    create: (data) =>
      request('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      request(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      request(`/projects/${id}`, {
        method: 'DELETE',
      }),
  },

  // Achievements
  achievements: {
    getAll: () => request('/achievements'),
    getById: (id) => request(`/achievements/${id}`),
    create: (data) =>
      request('/achievements', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      request(`/achievements/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      request(`/achievements/${id}`, {
        method: 'DELETE',
      }),
  },

  // Portfolio Management
  portfolio: {
    getSettings: () => request('/portfolio/settings'),
    updateSettings: (settings) =>
      request('/portfolio/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      }),
    getPreview: () => request('/portfolio/preview'),
    loadSampleData: () =>
      request('/portfolio/sample-data', {
        method: 'POST',
      }),
  },

  // Public View
  public: {
    getPortfolio: (slug) => request(`/public/portfolio/${slug}`),
  },
};
