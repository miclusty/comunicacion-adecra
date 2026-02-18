// Cloudflare Worker - Basic Auth para /admin
// Contraseña: comunicacion2026

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Solo proteger /admin (pero no /admin/index.html que tiene su propia auth)
    if (!url.pathname.startsWith('/admin')) {
      return fetch(request);
    }

    const auth = request.headers.get('Authorization');
    
    // Basic Auth: username:password codificado en base64
    // "comunicacion:ELc7v7S0T1SiN9uj" en base64 = Y29tdW5pY2FjaW9uOkVMYzd2N1MwVDFTaU45dWo=
    const validAuth = 'Basic Y29tdW5pY2FjaW9uOkVMYzd2N1MwVDFTaU45dWo=';
    
    if (auth === validAuth) {
      return fetch(request);
    }

    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin"',
        'Cache-Control': 'no-store'
      }
    });
  }
};
