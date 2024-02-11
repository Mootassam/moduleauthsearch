let inMemoryToken = null;

export class AuthToken {
  static get() {
    return (
      inMemoryToken || localStorage.getItem('jwt') || null
    );
  }

  static set(token, rememberMe) {
    if (rememberMe) {
      localStorage.setItem('jwt', token || '');
    } else {
      inMemoryToken = token;
      localStorage.setItem('jwt', '');
    }
  }

  static saveId(id) {
    if (id) {
      localStorage.setItem('id', id || null);
    } else {
      localStorage.setItem('id', '');
    }
  }

  static getId() {
    return localStorage.getItem('id');
  }
  static applyFromLocationUrlIfExists() {
    const urlParams = new URLSearchParams(
      window.location.search,
    );
    const authToken = urlParams.get('authToken');

    if (!authToken) {
      return;
    }

    this.set(authToken, true);
    window.history.replaceState(
      {},
      document.title,
      window.location.origin,
    );
  }
}
