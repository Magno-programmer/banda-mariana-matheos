import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Plus, TestTube } from 'lucide-react';
import { useEventNotifications } from '@/hooks/useEventNotifications';
import { PerformanceEvent } from '@/data/eventData';

const NotificationTestPanel: React.FC = () => {
  const { 
    scheduleEventNotifications, 
    settings, 
    isSupported,
    requestPermission 
  } = useEventNotifications();

  const [isVisible, setIsVisible] = useState(false);
  const [testEvent, setTestEvent] = useState({
    date: '',
    time: '20:00',
    venue: 'Local Teste',
    name: 'Show Teste da Mariana Matheos'
  });

  const handleTestNotification = async () => {
    if (!isSupported) {
      alert('Notificações não suportadas neste navegador');
      return;
    }

    if (settings.permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        alert('Permissão para notificações necessária');
        return;
      }
    }

    if (!testEvent.date) {
      alert('Por favor, selecione uma data');
      return;
    }

    // Criar evento de teste
    const mockEvent: PerformanceEvent = {
      id: `test-event-${Date.now()}`,
      name: testEvent.name,
      shortDate: formatDateForEvent(testEvent.date),
      day: getDayAbbreviation(testEvent.date),
      time: testEvent.time,
      venue: testEvent.venue,
      durationHours: 2,
      location: {
        name: testEvent.venue,
        address: {
          streetAddress: "Rua Teste, 123",
          addressLocality: "Belo Horizonte",
          addressRegion: "MG",
          postalCode: "30000-000",
          addressCountry: "BR"
        }
      },
      offer: {
        price: "50.00",
        priceCurrency: "BRL",
        availability: "InStock",
        validFrom: new Date().toISOString(),
        url: "https://marianamatheos.com.br/agenda"
      },
      image: "https://marianamatheos.com.br/images/banda.avif",
      description: "Show de teste para demonstração das notificações",
      performer: {
        name: "Mariana Matheos Jazz Band"
      },
      eventStatus: "EventScheduled",
      eventAttendanceMode: "OfflineEventAttendanceMode"
    };

    // Agendar notificações
    const scheduledNotifications = scheduleEventNotifications(mockEvent);
    
    alert(`✅ ${scheduledNotifications?.length || 0} notificações agendadas para o show de teste!`);
    
    // Limpar form
    setTestEvent({
      date: '',
      time: '20:00',
      venue: 'Local Teste',
      name: 'Show Teste da Mariana Matheos'
    });
  };

  const formatDateForEvent = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  const getDayAbbreviation = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getDay()];
  };

  // Só mostrar em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          size="sm"
        >
          <TestTube className="h-4 w-4 mr-2" />
          Teste
        </Button>
      ) : (
        <Card className="w-80 bg-gray-900 border-purple-500/30 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Teste de Notificações
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-6 w-6 p-0 text-gray-400"
              >
                ✕
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-xs text-gray-400 mb-4">
              <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                Modo Desenvolvimento
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="event-name" className="text-gray-300">Nome do Show</Label>
                <Input
                  id="event-name"
                  value={testEvent.name}
                  onChange={(e) => setTestEvent(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="event-date" className="text-gray-300">Data</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={testEvent.date}
                  onChange={(e) => setTestEvent(prev => ({ ...prev, date: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="event-time" className="text-gray-300">Horário</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={testEvent.time}
                    onChange={(e) => setTestEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="event-venue" className="text-gray-300">Local</Label>
                  <Input
                    id="event-venue"
                    value={testEvent.venue}
                    onChange={(e) => setTestEvent(prev => ({ ...prev, venue: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-400 p-2 bg-gray-800 rounded">
              <p className="mb-1">📱 Irá criar notificações para:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>✨ Novo show (imediata)</li>
                <li>📅 1 mês antes</li>
                <li>⏰ 2 semanas antes</li>
                <li>🔔 3 dias antes</li>
              </ul>
            </div>

            <Button
              onClick={handleTestNotification}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={!testEvent.date}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agendar Notificações de Teste
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationTestPanel;
