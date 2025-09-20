import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import PerformanceChart from '@/components/PerformanceChart';

interface EquipmentData {
  id: string;
  name: string;
  status: 'operational' | 'warning' | 'alert' | 'offline';
  temperature: number;
  pressure: number;
  power: number;
  efficiency: number;
}

interface AlertData {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  equipment: string;
}

interface ChartData {
  time: string;
  power: number;
  temperature: number;
  efficiency: number;
}

const Index: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [chartData, setChartData] = useState<ChartData[]>([
    { time: '14:25', power: 720, temperature: 485, efficiency: 92 },
    { time: '14:26', power: 718, temperature: 487, efficiency: 91 },
    { time: '14:27', power: 722, temperature: 489, efficiency: 93 },
    { time: '14:28', power: 715, temperature: 492, efficiency: 90 },
    { time: '14:29', power: 720, temperature: 485, efficiency: 92 },
    { time: '14:30', power: 725, temperature: 483, efficiency: 94 },
    { time: '14:31', power: 719, temperature: 488, efficiency: 91 },
    { time: '14:32', power: 720, temperature: 485, efficiency: 92 }
  ]);
  const [equipmentData, setEquipmentData] = useState<EquipmentData[]>([
    {
      id: '1',
      name: 'Турбина №1',
      status: 'operational',
      temperature: 485,
      pressure: 24.5,
      power: 250,
      efficiency: 94
    },
    {
      id: '2', 
      name: 'Котел №2',
      status: 'warning',
      temperature: 520,
      pressure: 26.8,
      power: 180,
      efficiency: 88
    },
    {
      id: '3',
      name: 'Генератор №1',
      status: 'operational',
      temperature: 65,
      pressure: 1.2,
      power: 245,
      efficiency: 96
    },
    {
      id: '4',
      name: 'Насос №3',
      status: 'alert',
      temperature: 85,
      pressure: 8.5,
      power: 45,
      efficiency: 72
    }
  ]);

  const [alerts, setAlerts] = useState<AlertData[]>([
    {
      id: '1',
      type: 'critical',
      message: 'Превышен критический уровень температуры',
      timestamp: '14:32',
      equipment: 'Насос №3'
    },
    {
      id: '2',
      type: 'warning', 
      message: 'Снижение эффективности ниже нормы',
      timestamp: '14:28',
      equipment: 'Котел №2'
    },
    {
      id: '3',
      type: 'info',
      message: 'Плановое техническое обслуживание',
      timestamp: '14:15',
      equipment: 'Турбина №2'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Симулируем обновление данных графика
      const newTime = new Date().toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      setChartData(prev => {
        const newData = [...prev];
        if (newData.length >= 8) {
          newData.shift(); // удаляем старые данные
        }
        
        // Добавляем новую точку с небольшими вариациями
        const lastPoint = newData[newData.length - 1];
        newData.push({
          time: newTime,
          power: lastPoint.power + (Math.random() - 0.5) * 10,
          temperature: lastPoint.temperature + (Math.random() - 0.5) * 8,
          efficiency: Math.max(85, Math.min(95, lastPoint.efficiency + (Math.random() - 0.5) * 3))
        });
        
        return newData;
      });
    }, 5000); // обновляем каждые 5 секунд

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'alert': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return 'Исправен';
      case 'warning': return 'Внимание';
      case 'alert': return 'Авария';
      case 'offline': return 'Отключен';
      default: return 'Неизвестно';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Диспетчерский Пульт ТЭЦ-5
            </h1>
            <p className="text-gray-400 mt-1">
              Автоматизированное рабочее место начальника смены
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-blue-400">
              {currentTime.toLocaleTimeString('ru-RU')}
            </div>
            <div className="text-sm text-gray-400">
              {currentTime.toLocaleDateString('ru-RU', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long', 
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Icon name="Zap" size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Общая мощность</p>
                  <p className="text-2xl font-bold text-white">720 МВт</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Icon name="Thermometer" size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Средняя температура</p>
                  <p className="text-2xl font-bold text-white">289°C</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Icon name="Gauge" size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Давление системы</p>
                  <p className="text-2xl font-bold text-white">15.2 атм</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Icon name="TrendingUp" size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">КПД станции</p>
                  <p className="text-2xl font-bold text-white">92.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment Monitoring */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Icon name="Settings" size={24} />
                <span>Мониторинг Оборудования</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {equipmentData.map((equipment) => (
                <div 
                  key={equipment.id}
                  className="bg-gray-700 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(equipment.status)}`} />
                      <h3 className="font-semibold text-white text-lg">
                        {equipment.name}
                      </h3>
                    </div>
                    <Badge 
                      variant={equipment.status === 'operational' ? 'default' : 'destructive'}
                      className={`font-mono text-xs ${
                        equipment.status === 'operational' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : equipment.status === 'warning'
                          ? 'bg-yellow-600 hover:bg-yellow-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {getStatusText(equipment.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Температура</p>
                      <p className="font-mono font-bold text-lg text-white">
                        {equipment.temperature}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Давление</p>
                      <p className="font-mono font-bold text-lg text-white">
                        {equipment.pressure} атм
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Мощность</p>
                      <p className="font-mono font-bold text-lg text-white">
                        {equipment.power} МВт
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">КПД</p>
                      <div className="space-y-1">
                        <p className="font-mono font-bold text-lg text-white">
                          {equipment.efficiency}%
                        </p>
                        <Progress 
                          value={equipment.efficiency} 
                          className="h-2 bg-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Charts and Alerts */}
        <div className="space-y-6">
          {/* Performance Charts */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Icon name="TrendingUp" size={24} />
                <span>Мониторинг Производительности</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart 
                data={chartData}
                title="Общие Показатели Станции" 
                height={250}
              />
            </CardContent>
          </Card>

          {/* Alert System */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Icon name="Bell" size={24} />
                <span>Система Уведомлений</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert) => (
                <Alert 
                  key={alert.id}
                  className={`border-l-4 ${getAlertColor(alert.type)} bg-opacity-10`}
                >
                  <Icon name={getAlertIcon(alert.type)} size={16} />
                  <AlertDescription className="text-sm">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">
                        {alert.message}
                      </p>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{alert.equipment}</span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>

          {/* Control Panel */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Icon name="ToggleLeft" size={24} />
                <span>Панель Управления</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                size="lg"
              >
                <Icon name="Play" size={18} className="mr-2" />
                Запустить Резервную Турбину
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                size="lg"
              >
                <Icon name="AlertTriangle" size={18} className="mr-2" />
                Активировать Аварийный Режим
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                size="lg"
              >
                <Icon name="FileText" size={18} className="mr-2" />
                Сформировать Отчет
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white"
                size="lg"
              >
                <Icon name="Users" size={18} className="mr-2" />
                Управление Сменой
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;