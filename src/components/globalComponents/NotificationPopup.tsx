import React, { useState, useEffect } from 'react';
import { X, Bell, Calendar, Clock, MapPin, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEventNotifications, EventNotification } from '@/hooks/useEventNotifications';

interface NotificationPopupProps {
  notification: EventNotification;
  onClose: () => void;
  onViewAgenda: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  notification,
  onClose,
  onViewAgenda
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animação de entrada
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Aguardar animação de saída
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'new_show':
        return <Music className="h-6 w-6 text-yellow-500" />;
      case 'one_month':
        return <Calendar className="h-6 w-6 text-blue-500" />;
      case 'two_weeks':
        return <Clock className="h-6 w-6 text-orange-500" />;
      case 'three_days':
        return <Bell className="h-6 w-6 text-red-500" />;
      default:
        return <Bell className="h-6 w-6 text-jazz-gold" />;
    }
  };

  const getBadgeColor = () => {
    switch (notification.type) {
      case 'new_show':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'one_month':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'two_weeks':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'three_days':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-jazz-gold hover:bg-jazz-gold/80';
    }
  };

  const getTypeLabel = () => {
    switch (notification.type) {
      case 'new_show':
        return 'Novo Show';
      case 'one_month':
        return 'Em 1 mês';
      case 'two_weeks':
        return 'Em 2 semanas';
      case 'three_days':
        return 'Em 3 dias';
      default:
        return 'Lembrete';
    }
  };

  const handleViewAgenda = () => {
    onClose();
    // Usar window.location para navegação sem depender do Router
    window.location.href = '/agenda';
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <Card 
        className={`w-full max-w-md bg-gradient-to-br from-gray-900 to-black border-jazz-gold/30 shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getIcon()}
              <Badge className={`${getBadgeColor()} text-white`}>
                {getTypeLabel()}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardTitle className="text-jazz-gold font-glimmer text-xl">
            {notification.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            {notification.body}
          </p>

          <div className="space-y-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Calendar className="h-4 w-4 text-jazz-gold" />
              <span>{notification.event.shortDate} - {notification.event.day}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock className="h-4 w-4 text-jazz-gold" />
              <span>{notification.event.time}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin className="h-4 w-4 text-jazz-gold" />
              <span>{notification.event.venue}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleViewAgenda}
              className="flex-1 bg-jazz-gold hover:bg-jazz-gold/80 text-black font-bold"
            >
              Ver Agenda
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Fechar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPopup;
