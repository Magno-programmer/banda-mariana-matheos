import React, { useState, useEffect } from 'react';
import { useEventNotifications, EventNotification } from '@/hooks/useEventNotifications';
import NotificationPopup from './NotificationPopup';
import NotificationSettingsPanel from './NotificationSettingsPanel';
import NotificationTestPanel from './NotificationTestPanel';

const EventNotificationManager: React.FC = () => {
  const {
    settings,
    notifications,
    isSupported,
    checkPendingNotifications,
    cleanupOldNotifications
  } = useEventNotifications();

  const [currentNotification, setCurrentNotification] = useState<EventNotification | null>(null);
  const [notificationQueue, setNotificationQueue] = useState<EventNotification[]>([]);

  // Verificar notificações pendentes periodicamente
  useEffect(() => {
    if (!isSupported || settings.permission !== 'granted') return;

    const checkNotifications = () => {
      checkPendingNotifications();
      
      // Verificar se há notificações não mostradas
      const now = new Date();
      const recentNotifications = notifications.filter(
        n => n.sent && 
        n.scheduledFor <= now && 
        n.scheduledFor >= new Date(now.getTime() - 5 * 60 * 1000) // Últimos 5 minutos
      );

      if (recentNotifications.length > 0 && !currentNotification) {
        setNotificationQueue(recentNotifications);
      }
    };

    // Verificar imediatamente
    checkNotifications();

    // Verificar a cada minuto
    const interval = setInterval(checkNotifications, 60000);

    return () => clearInterval(interval);
  }, [isSupported, settings.permission, notifications, currentNotification, checkPendingNotifications]);

  // Processar fila de notificações
  useEffect(() => {
    if (notificationQueue.length > 0 && !currentNotification) {
      const nextNotification = notificationQueue[0];
      setCurrentNotification(nextNotification);
      setNotificationQueue(prev => prev.slice(1));
    }
  }, [notificationQueue, currentNotification]);

  // Limpar notificações antigas periodicamente
  useEffect(() => {
    const cleanup = () => {
      cleanupOldNotifications();
    };

    // Limpar a cada hora
    const interval = setInterval(cleanup, 60 * 60 * 1000);
    
    // Limpar imediatamente
    cleanup();

    return () => clearInterval(interval);
  }, [cleanupOldNotifications]);

  // Simular nova notificação para teste (apenas em desenvolvimento)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const testNotification = () => {
        // Criar notificação de teste apenas se não houver uma ativa
        if (!currentNotification && notifications.length > 0) {
          const testEvent = notifications[0];
          if (testEvent) {
            console.log('🔔 Simulando notificação de teste:', testEvent.title);
          }
        }
      };

      // Executar teste após 10 segundos (apenas uma vez)
      const timeout = setTimeout(testNotification, 10000);
      return () => clearTimeout(timeout);
    }
  }, [currentNotification, notifications]);

  const handleCloseNotification = () => {
    setCurrentNotification(null);
  };

  const handleViewAgenda = () => {
    setCurrentNotification(null);
    // Usar window.location para navegação sem depender do Router
    window.location.href = '/agenda';
  };

  return (
    <>
      {/* Popup de Notificação */}
      {currentNotification && (
        <NotificationPopup
          notification={currentNotification}
          onClose={handleCloseNotification}
          onViewAgenda={handleViewAgenda}
        />
      )}

      {/* Painel de Teste (apenas em desenvolvimento) */}
      <NotificationTestPanel />

      {/* Painel de Configurações (pode ser chamado de qualquer lugar) */}
      {/* NotificationSettingsPanel será usado em componentes específicos */}
    </>
  );
};

export default EventNotificationManager;
