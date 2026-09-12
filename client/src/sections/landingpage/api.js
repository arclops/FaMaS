import { apiFetch } from '../../api/client';

// ----------------------------------------------------------------------

export async function submitContactForm(formData) {
  const response = await apiFetch('/api/homepage/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    let detail = '';

    try {
      const payload = await response.json();
      detail = payload?.error || payload?.message || '';
    } catch (parseError) {
      detail = '';
    }

    throw new Error(
      detail || `The message could not be sent (server responded with ${response.status}).`
    );
  }

  return response;
}
