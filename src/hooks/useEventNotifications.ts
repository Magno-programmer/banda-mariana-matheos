import { useState, useEffect, useCallback } from 'react';
import { eventsData, PerformanceEvent } from '@/data/eventData';

export interface NotificationSettings {
  newShows: boolean;
  oneMonth: boolean;
  twoWeeks: boolean;
  threeDays: boolean;
  permission: NotificationPermission;
}

export interface EventNotification {
  id: string;
  eventId: string;
  type: 'new_show' | 'one_month' | 'two_weeks' | 'three_days';
  title: string;
  body: string;
  scheduledFor: Date;
  sent: boolean;
  event: PerformanceEvent;
}

const defaultSettings: NotificationSettings = {
  newShows: true,
  oneMonth: true,
  twoWeeks: true,
  threeDays: true,
  permission: 'default'
};

export const useEventNotifications = () => {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [notifications, setNotifications] = useState<EventNotification[]>([]);
  const [isSupported, setIsSupported] = useState(false);

  // Verificar suporte a notificações
  useEffect(() => {
    const checkSupport = () => {
      const supported = 'Notification' in window && 'serviceWorker' in navigator;
      setIsSupported(supported);
      
      if (supported) {
        setSettings(prev => ({
          ...prev,
          permission: Notification.permission
        }));
      }
    };

    checkSupport();
  }, []);

  // Carregar configurações salvas
  useEffect(() => {
    const savedSettings = localStorage.getItem('eventNotificationSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Erro ao carregar configurações de notificação:', error);
      }
    }

    const savedNotifications = localStorage.getItem('scheduledNotifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed.map((n: any) => ({
          ...n,
          scheduledFor: new Date(n.scheduledFor)
        })));
      } catch (error) {
        console.error('Erro ao carregar notificações agendadas:', error);
      }
    }
  }, []);

  // Salvar configurações
  const saveSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('eventNotificationSettings', JSON.stringify(updated));
  }, [settings]);

  // Salvar notificações
  const saveNotifications = useCallback((newNotifications: EventNotification[]) => {
    setNotifications(newNotifications);
    localStorage.setItem('scheduledNotifications', JSON.stringify(newNotifications));
  }, []);

  // Solicitar permissão
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      const permission = await Notification.requestPermission();
      saveSettings({ permission });
      return permission === 'granted';
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      return false;
    }
  }, [isSupported, saveSettings]);

  // Calcular datas de notificação
  const calculateNotificationDates = useCallback((event: PerformanceEvent) => {
    const [day, month] = event.shortDate.split('/');
    const year = new Date().getFullYear();
    let eventDate = new Date(year, parseInt(month) - 1, parseInt(day));
    
    // Se a data já passou este ano, considerar o próximo ano
    if (eventDate < new Date()) {
      eventDate = new Date(year + 1, parseInt(month) - 1, parseInt(day));
    }

    const notifications: { type: EventNotification['type'], date: Date }[] = [];

    // 1 mês antes
    const oneMonthBefore = new Date(eventDate);
    oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
    if (oneMonthBefore > new Date() && settings.oneMonth) {
      notifications.push({ type: 'one_month', date: oneMonthBefore });
    }

    // 2 semanas antes
    const twoWeeksBefore = new Date(eventDate);
    twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14);
    if (twoWeeksBefore > new Date() && settings.twoWeeks) {
      notifications.push({ type: 'two_weeks', date: twoWeeksBefore });
    }

    // 3 dias antes
    const threeDaysBefore = new Date(eventDate);
    threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);
    if (threeDaysBefore > new Date() && settings.threeDays) {
      notifications.push({ type: 'three_days', date: threeDaysBefore });
    }

    return notifications;
  }, [settings]);

  // Criar mensagens de notificação
  const createNotificationMessage = useCallback((event: PerformanceEvent, type: EventNotification['type']) => {
    const messages = {
      new_show: {
        title: '🎵 Novo Show Agendado!',
        body: `${event.name} - ${event.shortDate} às ${event.time} no ${event.venue}`
      },
      one_month: {
        title: '📅 Show em 1 mês!',
        body: `Lembrete: ${event.name} em ${event.shortDate} no ${event.venue}`
      },
      two_weeks: {
        title: '⏰ Show em 2 semanas!',
        body: `Se prepara! ${event.name} em ${event.shortDate} no ${event.venue}`
      },
      three_days: {
        title: '🎤 Show em 3 dias!',
        body: `Quase chegando! ${event.name} em ${event.shortDate} no ${event.venue}`
      }
    };

    return messages[type];
  }, []);

  // Agendar notificações para um evento
  const scheduleEventNotifications = useCallback((event: PerformanceEvent) => {
    if (!isSupported || settings.permission !== 'granted') return;

    const notificationDates = calculateNotificationDates(event);
    const newNotifications: EventNotification[] = [];

    notificationDates.forEach(({ type, date }) => {
      const message = createNotificationMessage(event, type);
      const notification: EventNotification = {
        id: `${event.id}-${type}`,
        eventId: event.id,
        type,
        title: message.title,
        body: message.body,
        scheduledFor: date,
        sent: false,
        event
      };

      newNotifications.push(notification);
    });

    // Notificação de novo show (imediata se habilitada)
    if (settings.newShows) {
      const newShowMessage = createNotificationMessage(event, 'new_show');
      const newShowNotification: EventNotification = {
        id: `${event.id}-new_show`,
        eventId: event.id,
        type: 'new_show',
        title: newShowMessage.title,
        body: newShowMessage.body,
        scheduledFor: new Date(),
        sent: false,
        event
      };

      newNotifications.push(newShowNotification);
    }

    const updatedNotifications = [...notifications, ...newNotifications];
    saveNotifications(updatedNotifications);

    return newNotifications;
  }, [isSupported, settings, notifications, calculateNotificationDates, createNotificationMessage, saveNotifications]);

  // Agendar todas as notificações dos eventos
  const scheduleAllEventNotifications = useCallback(() => {
    if (!isSupported || settings.permission !== 'granted') return;

    let allNewNotifications: EventNotification[] = [];

    eventsData.forEach(event => {
      const eventNotifications = scheduleEventNotifications(event);
      allNewNotifications = [...allNewNotifications, ...eventNotifications];
    });

    return allNewNotifications;
  }, [isSupported, settings.permission, scheduleEventNotifications]);

  // Verificar e enviar notificações pendentes
  const checkPendingNotifications = useCallback(() => {
    if (!isSupported || settings.permission !== 'granted') return;

    const now = new Date();
    const pendingNotifications = notifications.filter(
      n => !n.sent && n.scheduledFor <= now
    );

    pendingNotifications.forEach(notification => {
      // Enviar notificação
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        // Usar Service Worker para notificação
        navigator.serviceWorker.controller.postMessage({
          type: 'SHOW_NOTIFICATION',
          payload: {
            title: notification.title,
            body: notification.body,
            icon: '/favicon-192x192.png',
            badge: '/favicon-48x48.png',
            tag: notification.id,
            data: {
              eventId: notification.eventId,
              type: notification.type,
              url: '/agenda'
            }
          }
        });
      } else {
        // Fallback para notificação direta
        new Notification(notification.title, {
          body: notification.body,
          icon: '/favicon-192x192.png',
          tag: notification.id,
          data: {
            eventId: notification.eventId,
            type: notification.type
          }
        });
      }

      // Marcar como enviada
      notification.sent = true;
    });

    if (pendingNotifications.length > 0) {
      saveNotifications([...notifications]);
    }
  }, [isSupported, settings.permission, notifications, saveNotifications]);

  // Verificar notificações periodicamente
  useEffect(() => {
    if (!isSupported || settings.permission !== 'granted') return;

    const interval = setInterval(checkPendingNotifications, 60000); // Check every minute
    
    // Check immediately
    checkPendingNotifications();

    return () => clearInterval(interval);
  }, [isSupported, settings.permission, checkPendingNotifications]);

  // Limpar notificações antigas
  const cleanupOldNotifications = useCallback(() => {
    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));
    
    const activeNotifications = notifications.filter(
      n => n.scheduledFor > threeDaysAgo || !n.sent
    );

    if (activeNotifications.length !== notifications.length) {
      saveNotifications(activeNotifications);
    }
  }, [notifications, saveNotifications]);

  return {
    settings,
    notifications,
    isSupported,
    requestPermission,
    saveSettings,
    scheduleEventNotifications,
    scheduleAllEventNotifications,
    checkPendingNotifications,
    cleanupOldNotifications
  };
};
