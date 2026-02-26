// Image upload handling (R2)
import { authenticate } from './auth.js';

// Upload image to R2
export async function handleUploadImage(request, env) {
  const user = await authenticate(request, env);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const type = formData.get('type'); // 'profile', 'post', 'perfume'

    if (!file) {
      return new Response(JSON.stringify({ error: 'No image provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF allowed.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: 'File too large. Max 5MB.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const extension = file.type.split('/')[1];
    const filename = `${type || 'image'}/${user.id}/${timestamp}-${random}.${extension}`;

    // Upload to R2
    const arrayBuffer = await file.arrayBuffer();
    await env.IMAGES.put(filename, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Generate public URL
    const imageUrl = `/images/${filename}`;

    return new Response(JSON.stringify({ 
      success: true,
      url: imageUrl,
      filename: filename
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Upload failed', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get image from R2
export async function handleGetImage(request, env, filename) {
  try {
    const object = await env.IMAGES.get(filename);

    if (!object) {
      return new Response('Image not found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000');

    return new Response(object.body, { headers });

  } catch (error) {
    console.error('Get image error:', error);
    return new Response('Error retrieving image', { status: 500 });
  }
}

// Delete image from R2 (optional - for cleanup)
export async function handleDeleteImage(request, env, filename) {
  const user = await authenticate(request, env);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Check if user owns this image (filename should start with their user id)
    if (!filename.includes(`/${user.id}/`)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.IMAGES.delete(filename);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Delete image error:', error);
    return new Response(JSON.stringify({ error: 'Delete failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
