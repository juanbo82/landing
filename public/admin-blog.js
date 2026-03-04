// ============================================================
// Admin Blog - StreetWOD
// ============================================================

const SUPABASE_URL = 'https://odgmkquuhhpartjehsmk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kZ21rcXV1aGhwYXJ0amVoc21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDE2MzcsImV4cCI6MjA4NjU3NzYzN30.fMqxbExUk1lgucXpex1HOaKpQJaie3JQVxl4kh-bgCk';

if (window.location.protocol === 'file:') {
  document.body.innerHTML = '<div style="padding:2rem;color:#ef4444;font-family:sans-serif;"><h2>Debes servir la página con un servidor local</h2><pre style="background:#1a1a1a;padding:1rem;border-radius:8px;margin-top:1rem;">cd landing\nnpx serve .</pre></div>';
} else {
  initBlogAdmin();
}

function initBlogAdmin() {
  const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // DOM refs
  const loginScreen = document.getElementById('login-screen');
  const panelScreen = document.getElementById('panel-screen');
  const loginForm = document.getElementById('login-form');
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');
  const adminEmailEl = document.getElementById('admin-email');
  const noAuthMsg = document.getElementById('no-auth-msg');
  const adminContent = document.getElementById('admin-content');

  // Views
  const viewList = document.getElementById('view-list');
  const viewEditor = document.getElementById('view-editor');
  const postsList = document.getElementById('posts-list');
  const editorTitle = document.getElementById('editor-title');

  // Buttons
  const btnNewPost = document.getElementById('btn-new-post');
  const btnBackList = document.getElementById('btn-back-list');
  const btnDeletePost = document.getElementById('btn-delete-post');

  // Form
  const postForm = document.getElementById('post-form');
  const postTitleInput = document.getElementById('post-title');
  const postSlugInput = document.getElementById('post-slug');
  const postAuthorInput = document.getElementById('post-author');
  const postCoverUrlInput = document.getElementById('post-cover-url');
  const postCoverFileInput = document.getElementById('post-cover-file');
  const postExcerptInput = document.getElementById('post-excerpt');
  const postContentInput = document.getElementById('post-content');
  const postPublishedInput = document.getElementById('post-published');
  const coverUploadArea = document.getElementById('cover-upload-area');
  const coverUploadPlaceholder = document.getElementById('cover-upload-placeholder');
  const coverPreview = document.getElementById('cover-preview');
  const coverPreviewImg = document.getElementById('cover-preview-img');
  const coverUploading = document.getElementById('cover-uploading');
  const btnRemoveCover = document.getElementById('btn-remove-cover');
  const formError = document.getElementById('form-error');
  const formSuccess = document.getElementById('form-success');

  const BLOG_IMAGES_BUCKET = 'blog-images';
  let editingPostId = null;

  // ========================
  // Auth
  // ========================
  async function checkSession() {
    const { data: { session } } = await db.auth.getSession();
    if (session) {
      await showPanel(session.user);
    } else {
      loginScreen.classList.remove('hidden');
      panelScreen.classList.add('hidden');
    }
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    const { data, error } = await db.auth.signInWithPassword({
      email: loginEmail.value.trim(),
      password: loginPassword.value,
    });
    if (error) {
      loginError.textContent = error.message;
      return;
    }
    await showPanel(data.user);
  });

  logoutBtn.addEventListener('click', async () => {
    await db.auth.signOut();
    loginScreen.classList.remove('hidden');
    panelScreen.classList.add('hidden');
  });

  async function showPanel(user) {
    loginScreen.classList.add('hidden');
    panelScreen.classList.remove('hidden');
    adminEmailEl.textContent = user.email;

    const isAdm = await isAdmin(user);
    if (!isAdm) {
      noAuthMsg.classList.remove('hidden');
      adminContent.classList.add('hidden');
      return;
    }
    noAuthMsg.classList.add('hidden');
    adminContent.classList.remove('hidden');
    loadPosts();
  }

  async function isAdmin(user) {
    const { data } = await db.from('admin_users').select('user_id').eq('user_id', user.id).single();
    return !!data;
  }

  // ========================
  // Views
  // ========================
  function showListView() {
    viewList.classList.remove('hidden');
    viewEditor.classList.add('hidden');
    editingPostId = null;
    loadPosts();
  }

  function showEditorView(post) {
    viewList.classList.add('hidden');
    viewEditor.classList.remove('hidden');
    formError.textContent = '';
    formSuccess.textContent = '';

    if (post) {
      editingPostId = post.id;
      editorTitle.textContent = 'Editar artículo';
      postTitleInput.value = post.title || '';
      postSlugInput.value = post.slug || '';
      postAuthorInput.value = post.author_name || 'StreetWOD';
      postCoverUrlInput.value = post.cover_image_url || '';
      postExcerptInput.value = post.excerpt || '';
      postContentInput.value = post.content || '';
      postPublishedInput.checked = post.is_published;
      btnDeletePost.style.display = 'block';
      showCoverState();
    } else {
      editingPostId = null;
      editorTitle.textContent = 'Nuevo artículo';
      postForm.reset();
      postAuthorInput.value = 'StreetWOD';
      postCoverUrlInput.value = '';
      btnDeletePost.style.display = 'none';
      showCoverState();
    }
  }

  // ========================
  // Load posts
  // ========================
  async function loadPosts() {
    const { data, error } = await db
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      postsList.innerHTML = '<p class="error-msg">Error al cargar artículos</p>';
      return;
    }

    if (!data || data.length === 0) {
      postsList.innerHTML = '<div class="posts-empty"><p>📝</p><p>No hay artículos aún. ¡Crea el primero!</p></div>';
      return;
    }

    postsList.innerHTML = data.map((post) => {
      const dateStr = post.published_at
        ? new Date(post.published_at).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Sin publicar';
      const statusClass = post.is_published ? 'published' : 'draft';
      const statusText = post.is_published ? 'Publicado' : 'Borrador';
      const coverHtml = post.cover_image_url
        ? `<img src="${post.cover_image_url}" class="post-item-cover" alt="">`
        : '<div class="post-item-placeholder">📄</div>';

      return `
        <div class="post-item" data-id="${post.id}">
          ${coverHtml}
          <div class="post-item-info">
            <div class="post-item-title">${escapeHtml(post.title)}</div>
            <div class="post-item-meta">
              <span class="post-status ${statusClass}">${statusText}</span>
              <span>${dateStr}</span>
              <span>${escapeHtml(post.author_name)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    postsList.querySelectorAll('.post-item').forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.dataset.id;
        const post = data.find((p) => p.id === id);
        if (post) showEditorView(post);
      });
    });
  }

  // ========================
  // Slug generation
  // ========================
  function generateSlug(text) {
    return text
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 120);
  }

  let slugManuallyEdited = false;

  postTitleInput.addEventListener('input', () => {
    if (!slugManuallyEdited && !editingPostId) {
      postSlugInput.value = generateSlug(postTitleInput.value);
    }
  });

  postSlugInput.addEventListener('input', () => {
    slugManuallyEdited = true;
    postSlugInput.value = generateSlug(postSlugInput.value);
  });

  // ========================
  // Cover image upload
  // ========================
  function showCoverState() {
    const url = postCoverUrlInput.value;
    if (url) {
      coverPreviewImg.src = url;
      coverPreview.classList.remove('hidden');
      coverUploadPlaceholder.classList.add('hidden');
    } else {
      coverPreview.classList.add('hidden');
      coverUploadPlaceholder.classList.remove('hidden');
    }
    coverUploading.classList.add('hidden');
  }

  async function uploadCoverImage(file) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      formError.textContent = 'La imagen no puede superar 5 MB.';
      return;
    }

    coverUploading.classList.remove('hidden');
    coverUploadPlaceholder.classList.add('hidden');
    coverPreview.classList.add('hidden');
    formError.textContent = '';

    const ext = file.name.split('.').pop().toLowerCase();
    const fileName = `covers/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await db.storage.from(BLOG_IMAGES_BUCKET).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      formError.textContent = 'Error al subir imagen: ' + error.message;
      showCoverState();
      return;
    }

    const { data: urlData } = db.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(fileName);
    postCoverUrlInput.value = urlData.publicUrl;
    showCoverState();
  }

  postCoverFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) uploadCoverImage(file);
    postCoverFileInput.value = '';
  });

  coverUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    coverUploadArea.classList.add('drag-over');
  });
  coverUploadArea.addEventListener('dragleave', () => {
    coverUploadArea.classList.remove('drag-over');
  });
  coverUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    coverUploadArea.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) uploadCoverImage(file);
  });

  btnRemoveCover.addEventListener('click', (e) => {
    e.stopPropagation();
    postCoverUrlInput.value = '';
    showCoverState();
  });

  // ========================
  // Save post
  // ========================
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.textContent = '';
    formSuccess.textContent = '';

    const title = postTitleInput.value.trim();
    const slug = postSlugInput.value.trim();
    const author = postAuthorInput.value.trim() || 'StreetWOD';
    const cover = postCoverUrlInput.value.trim() || null;
    const excerpt = postExcerptInput.value.trim() || null;
    const content = postContentInput.value.trim();
    const isPublished = postPublishedInput.checked;

    if (!title || !slug || !content) {
      formError.textContent = 'Título, slug y contenido son obligatorios.';
      return;
    }

    const payload = {
      title,
      slug,
      author_name: author,
      cover_image_url: cover,
      excerpt,
      content,
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingPostId) {
      ({ error } = await db.from('blog_posts').update(payload).eq('id', editingPostId));
    } else {
      ({ error } = await db.from('blog_posts').insert(payload));
    }

    if (error) {
      formError.textContent = error.message;
      return;
    }

    formSuccess.textContent = editingPostId ? 'Artículo actualizado' : 'Artículo creado';
    slugManuallyEdited = false;

    setTimeout(() => showListView(), 800);
  });

  // ========================
  // Delete post
  // ========================
  btnDeletePost.addEventListener('click', async () => {
    if (!editingPostId) return;
    if (!confirm('¿Eliminar este artículo? Esta acción no se puede deshacer.')) return;

    const { error } = await db.from('blog_posts').delete().eq('id', editingPostId);
    if (error) {
      formError.textContent = error.message;
      return;
    }
    showListView();
  });

  // ========================
  // Navigation
  // ========================
  btnNewPost.addEventListener('click', () => {
    slugManuallyEdited = false;
    showEditorView(null);
  });
  btnBackList.addEventListener('click', showListView);

  // ========================
  // Helpers
  // ========================
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Init
  checkSession();
}
