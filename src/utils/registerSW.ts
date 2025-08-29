interface RegisterSWOptions {
  immediate?: boolean;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
  onOffline?: () => void;
  onUnsupported?: () => void;
}

export const registerServiceWorker = async ({
  immediate = true,
  onSuccess,
  onError,
  onOffline,
  onUnsupported,
}: RegisterSWOptions = {}) => {
  // Verifica se o Service Worker é suportado
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers não são suportados neste navegador');
    onUnsupported?.();
    return false;
  }

  // Verifica se é HTTPS (exceto localhost)
  if (!window.location.protocol.includes('https') && 
      !window.location.hostname.includes('localhost') && 
      !window.location.hostname.includes('127.0.0.1')) {
    console.warn('Service Workers requerem HTTPS');
    onUnsupported?.();
    return false;
  }

  // Verifica conectividade
  if (!navigator.onLine) {
    console.warn('Sem conexão com a internet');
    onOffline?.();
    return false;
  }

  try {
    // Se não for immediate, aguarda o carregamento da página
    if (!immediate) {
      await new Promise<void>((resolve) => {
        window.addEventListener('load', () => resolve());
      });
    }

    // Registra o Service Worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      type: 'classic'
    });

    // Verifica se o registro foi bem sucedido
    if (registration.active) {
      console.info('Service Worker ativo:', registration.scope);
      onSuccess?.(registration);
      return true;
    }

    // Aguarda a ativação se ainda não estiver ativo
    await new Promise<void>((resolve) => {
      registration.addEventListener('activate', () => {
        console.info('Service Worker ativado:', registration.scope);
        onSuccess?.(registration);
        resolve();
      });
    });

    return true;
  } catch (error) {
    console.error('Erro ao registrar Service Worker:', error);
    onError?.(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
};
