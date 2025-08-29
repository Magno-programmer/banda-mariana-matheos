import React, { useState } from 'react';
import { Bell, Settings, Check, X, Calendar, Clock, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEventNotifications } from '@/hooks/useEventNotifications';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const NotificationSettingsPanel: React.FC = () => {
  const {
    settings,
    notifications,
    isSupported,
    requestPermission,
    saveSettings,
    scheduleAllEventNotifications,
    cleanupOldNotifications
  } = useEventNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const handlePermissionRequest = async () => {
    setIsRequesting(true);
    try {
      const granted = await requestPermission();
      if (granted) {
        // Agendar notificações para todos os eventos
        scheduleAllEventNotifications();
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSettingChange = (setting: keyof typeof settings, value: boolean) => {
    saveSettings({ [setting]: value });
    
    // Se habilitou uma configuração e tem permissão, reagendar notificações
    if (value && settings.permission === 'granted') {
      scheduleAllEventNotifications();
    }
  };

  const getPermissionStatus = () => {
    switch (settings.permission) {
      case 'granted':
        return {
          color: 'bg-green-500',
          text: 'Permitidas',
          icon: <Check className="h-4 w-4" />
        };
      case 'denied':
        return {
          color: 'bg-red-500',
          text: 'Negadas',
          icon: <X className="h-4 w-4" />
        };
      default:
        return {
          color: 'bg-yellow-500',
          text: 'Pendente',
          icon: <Bell className="h-4 w-4" />
        };
    }
  };

  const pendingNotifications = notifications.filter(n => !n.sent && n.scheduledFor > new Date());
  const permissionStatus = getPermissionStatus();

  if (!isSupported) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative border-jazz-gold/30 text-jazz-gold hover:bg-jazz-gold hover:text-black transition-colors"
        >
          <Bell className="h-4 w-4 mr-2" />
          Notificações
          {pendingNotifications.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
              {pendingNotifications.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 to-black border-jazz-gold/30">
        <DialogHeader>
          <DialogTitle className="text-jazz-gold font-glimmer flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações de Notificações
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Configure quando você quer receber lembretes sobre os shows
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status das Permissões */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-300 flex items-center justify-between">
                Status das Notificações
                <Badge className={`${permissionStatus.color} text-white`}>
                  {permissionStatus.icon}
                  <span className="ml-1">{permissionStatus.text}</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {settings.permission !== 'granted' && (
                <div className="space-y-3">
                  <Alert className="border-yellow-500/30 bg-yellow-500/10">
                    <Bell className="h-4 w-4 text-yellow-500" />
                    <AlertDescription className="text-yellow-200">
                      {settings.permission === 'denied' 
                        ? 'Notificações foram negadas. Habilite nas configurações do navegador.'
                        : 'Permita notificações para receber lembretes sobre shows.'
                      }
                    </AlertDescription>
                  </Alert>
                  
                  {settings.permission !== 'denied' && (
                    <Button
                      onClick={handlePermissionRequest}
                      disabled={isRequesting}
                      className="w-full bg-jazz-gold hover:bg-jazz-gold/80 text-black font-bold"
                    >
                      {isRequesting ? 'Solicitando...' : 'Permitir Notificações'}
                    </Button>
                  )}
                </div>
              )}

              {settings.permission === 'granted' && (
                <div className="text-center text-green-400">
                  <p className="text-sm">✅ Notificações ativas!</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {pendingNotifications.length} lembretes agendados
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configurações de Notificações */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-300">Tipos de Lembrete</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Novos Shows */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Music className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-white">Novos Shows</p>
                    <p className="text-xs text-gray-400">Quando um novo show for adicionado</p>
                  </div>
                </div>
                <Switch
                  checked={settings.newShows}
                  onCheckedChange={(checked) => handleSettingChange('newShows', checked)}
                  disabled={settings.permission !== 'granted'}
                />
              </div>

              {/* 1 Mês Antes */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-white">1 Mês Antes</p>
                    <p className="text-xs text-gray-400">Lembrete 30 dias antes do show</p>
                  </div>
                </div>
                <Switch
                  checked={settings.oneMonth}
                  onCheckedChange={(checked) => handleSettingChange('oneMonth', checked)}
                  disabled={settings.permission !== 'granted'}
                />
              </div>

              {/* 2 Semanas Antes */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-white">2 Semanas Antes</p>
                    <p className="text-xs text-gray-400">Lembrete 14 dias antes do show</p>
                  </div>
                </div>
                <Switch
                  checked={settings.twoWeeks}
                  onCheckedChange={(checked) => handleSettingChange('twoWeeks', checked)}
                  disabled={settings.permission !== 'granted'}
                />
              </div>

              {/* 3 Dias Antes */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-white">3 Dias Antes</p>
                    <p className="text-xs text-gray-400">Lembrete final antes do show</p>
                  </div>
                </div>
                <Switch
                  checked={settings.threeDays}
                  onCheckedChange={(checked) => handleSettingChange('threeDays', checked)}
                  disabled={settings.permission !== 'granted'}
                />
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex gap-2">
            <Button
              onClick={() => cleanupOldNotifications()}
              variant="outline"
              size="sm"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Limpar Antigas
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-jazz-gold hover:bg-jazz-gold/80 text-black font-bold"
            >
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationSettingsPanel;
