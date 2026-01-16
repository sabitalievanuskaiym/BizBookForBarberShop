import { 
  servicesStorage, 
  bookingsStorage, 
  scheduleStorage, 
  blackoutsStorage, 
  productsStorage,
  adminStorage,
  initializeDefaultData,
  Service,
  Booking
} from './local-storage';
import { projectId, publicAnonKey } from './supabase/info';

// Initialize default data on first load
initializeDefaultData();

// Helper to make Supabase API calls
const supabaseApi = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-9af35e1f${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
};

export const api = {
  // Public endpoints
  async getServices() {
    try {
      return await supabaseApi('/services');
    } catch (error) {
      console.error('Error fetching services:', error);
      return { services: [] };
    }
  },

  async getSlots(serviceId: string, date: string) {
    try {
      const params = new URLSearchParams({ service_id: serviceId, date });
      return await supabaseApi(`/slots?${params.toString()}`);
    } catch (error) {
      console.error('Error fetching slots:', error);
      return { slots: [] };
    }
  },

  async createBooking(data: any) {
    try {
      return await supabaseApi('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          service_id: data.serviceId || data.service_id,
          date: data.date,
          time: data.time,
          customer_name: data.customerName || data.customer_name,
          phone: data.phone,
          note: data.note || '',
        }),
      });
    } catch (error: any) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Admin endpoints
  async signup(email: string, password: string, name: string) {
    try {
      return await supabaseApi('/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      return await supabaseApi('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  async adminGetServices(token: string) {
    try {
      return await supabaseApi('/admin/services', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error fetching admin services:', error);
      throw error;
    }
  },

  async createService(token: string, data: any) {
    try {
      return await supabaseApi('/admin/services', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  async updateService(token: string, id: string, data: any) {
    try {
      return await supabaseApi(`/admin/services/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },

  async deleteService(token: string, id: string) {
    try {
      return await supabaseApi(`/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  },

  async getBookings(token: string, params?: { status?: string; from?: string; to?: string }) {
    try {
      const query = new URLSearchParams();
      if (params?.status) query.append('status', params.status);
      if (params?.from) query.append('from', params.from);
      if (params?.to) query.append('to', params.to);
      
      const endpoint = `/admin/bookings${query.toString() ? '?' + query.toString() : ''}`;
      return await supabaseApi(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  async updateBooking(token: string, id: string, data: any) {
    try {
      return await supabaseApi(`/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  async getSchedule(token: string) {
    try {
      return await supabaseApi('/admin/schedule', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error fetching schedule:', error);
      throw error;
    }
  },

  async updateSchedule(token: string, rules: any[]) {
    try {
      return await supabaseApi('/admin/schedule', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ rules }),
      });
    } catch (error) {
      console.error('Error updating schedule:', error);
      throw error;
    }
  },

  async getBlackouts(token: string) {
    try {
      return await supabaseApi('/admin/blackouts', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error fetching blackouts:', error);
      throw error;
    }
  },

  async createBlackout(token: string, data: any) {
    try {
      return await supabaseApi('/admin/blackouts', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error creating blackout:', error);
      throw error;
    }
  },

  async deleteBlackout(token: string, id: string) {
    try {
      return await supabaseApi(`/admin/blackouts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error deleting blackout:', error);
      throw error;
    }
  },

  async getStats(token: string, params?: { from?: string; to?: string }) {
    try {
      const query = new URLSearchParams();
      if (params?.from) query.append('from', params.from);
      if (params?.to) query.append('to', params.to);
      
      const endpoint = `/admin/stats${query.toString() ? '?' + query.toString() : ''}`;
      return await supabaseApi(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Marketplace endpoints
  async getProducts(token?: string) {
    try {
      const endpoint = token ? '/admin/products' : '/products';
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      return await supabaseApi(endpoint, { headers });
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async createProduct(token: string, data: any) {
    try {
      return await supabaseApi('/admin/products', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          name: data.name,
          brand: data.brand,
          description: data.description,
          price: data.price,
          category: data.category,
          image: data.image,
          in_stock: data.inStock,
          volume: data.volume || '',
        }),
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async updateProduct(token: string, id: string, data: any) {
    try {
      return await supabaseApi(`/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          name: data.name,
          brand: data.brand,
          description: data.description,
          price: data.price,
          category: data.category,
          image: data.image,
          in_stock: data.inStock,
          volume: data.volume || '',
        }),
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(token: string, id: string) {
    try {
      return await supabaseApi(`/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Masters endpoints
  async getMasters(token?: string) {
    try {
      const endpoint = token ? '/admin/masters' : '/masters';
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      return await supabaseApi(endpoint, { headers });
    } catch (error) {
      console.error('Error fetching masters:', error);
      throw error;
    }
  },

  async createMaster(token: string, data: any) {
    try {
      return await supabaseApi('/admin/masters', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error creating master:', error);
      throw error;
    }
  },

  async updateMaster(token: string, id: string, data: any) {
    try {
      return await supabaseApi(`/admin/masters/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error updating master:', error);
      throw error;
    }
  },

  async deleteMaster(token: string, id: string) {
    try {
      return await supabaseApi(`/admin/masters/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error deleting master:', error);
      throw error;
    }
  },

  // Finance endpoints
  async getFinance(token: string, params?: { from?: string; to?: string; type?: string }) {
    try {
      const query = new URLSearchParams();
      if (params?.from) query.append('from', params.from);
      if (params?.to) query.append('to', params.to);
      if (params?.type) query.append('type', params.type);
      
      const endpoint = `/admin/finance${query.toString() ? '?' + query.toString() : ''}`;
      return await supabaseApi(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error fetching finance:', error);
      throw error;
    }
  },

  async createFinanceRecord(token: string, data: any) {
    try {
      return await supabaseApi('/admin/finance', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error creating finance record:', error);
      throw error;
    }
  },

  async updateFinanceRecord(token: string, id: string, data: any) {
    try {
      return await supabaseApi(`/admin/finance/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error updating finance record:', error);
      throw error;
    }
  },

  async deleteFinanceRecord(token: string, id: string) {
    try {
      return await supabaseApi(`/admin/finance/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error deleting finance record:', error);
      throw error;
    }
  }
};

// Helper functions for client-side usage
export async function fetchServices() {
  return api.getServices();
}

export async function fetchMasters() {
  try {
    const data = await api.getMasters();
    // Map to expected format for MasterSelector
    return (data.masters || []).map((m: any) => ({
      id: m.id,
      name: m.name,
      specialty: m.specialization,
      rating: 4.8, // Default rating since it's not in DB yet
      experience: '5 лет опыта', // Default experience
      avatar: m.avatar,
      phone: m.phone,
      email: m.email,
    }));
  } catch (error) {
    console.error('Error fetching masters:', error);
    return [];
  }
}