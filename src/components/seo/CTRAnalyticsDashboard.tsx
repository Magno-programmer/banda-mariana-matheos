import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Eye, MousePointer, Clock, Users, Search, Target } from 'lucide-react';

interface CTRData {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  page: string;
}

interface QueryPerformance {
  query: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  change: number;
}

const CTRAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPage, setSelectedPage] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample data - in production, this would come from your analytics API
  const [ctrData, setCtrData] = useState<CTRData[]>([
    { date: '2024-01-15', impressions: 1250, clicks: 125, ctr: 10.0, position: 3.2, page: '/' },
    { date: '2024-01-16', impressions: 1380, clicks: 152, ctr: 11.0, position: 3.1, page: '/' },
    { date: '2024-01-17', impressions: 1420, clicks: 170, ctr: 12.0, position: 2.9, page: '/' },
    { date: '2024-01-18', impressions: 1550, clicks: 201, ctr: 13.0, position: 2.8, page: '/' },
    { date: '2024-01-19', impressions: 1680, clicks: 235, ctr: 14.0, position: 2.6, page: '/' },
    { date: '2024-01-20', impressions: 1820, clicks: 273, ctr: 15.0, position: 2.4, page: '/' },
    { date: '2024-01-21', impressions: 1950, clicks: 312, ctr: 16.0, position: 2.2, page: '/' },
  ]);

  const [topQueries, setTopQueries] = useState<QueryPerformance[]>([
    { query: 'banda de jazz belo horizonte', impressions: 5420, clicks: 842, ctr: 15.5, position: 2.1, change: 12.3 },
    { query: 'música casamento BH', impressions: 3250, clicks: 468, ctr: 14.4, position: 2.8, change: 8.7 },
    { query: 'mariana matheos jazz', impressions: 2890, clicks: 433, ctr: 15.0, position: 1.9, change: 15.2 },
    { query: 'banda jazz eventos corporativos', impressions: 1950, clicks: 254, ctr: 13.0, position: 3.2, change: 5.4 },
    { query: 'show jazz bh', impressions: 1620, clicks: 178, ctr: 11.0, position: 4.1, change: -2.1 },
  ]);

  const pagePerformance = [
    { name: 'Home', value: 35, color: '#e3bd68' },
    { name: 'Sobre', value: 20, color: '#800000' },
    { name: 'Repertório', value: 15, color: '#c4a661' },
    { name: 'Contato', value: 12, color: '#b89952' },
    { name: 'FAQ', value: 10, color: '#a68b47' },
    { name: 'Outros', value: 8, color: '#947d3c' },
  ];

  const abTestResults = [
    { 
      variation: 'Título A (com emoji)', 
      impressions: 2500, 
      clicks: 375, 
      ctr: 15.0, 
      confidence: 95,
      winner: true 
    },
    { 
      variation: 'Título B (sem emoji)', 
      impressions: 2480, 
      clicks: 322, 
      ctr: 13.0, 
      confidence: 95,
      winner: false 
    },
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const calculateTotalCTR = () => {
    const totalImpressions = ctrData.reduce((sum, item) => sum + item.impressions, 0);
    const totalClicks = ctrData.reduce((sum, item) => sum + item.clicks, 0);
    return totalClicks > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : '0.0';
  };

  const getAveragePosition = () => {
    const avgPos = ctrData.reduce((sum, item) => sum + item.position, 0) / ctrData.length;
    return avgPos.toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-jazz-gold text-xl">Carregando dados de CTR...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-jazz-gold mb-2">
            Dashboard de CTR Analytics
          </h1>
          <p className="text-white/70">
            Análise avançada de performance de CTR e otimizações SERP
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-jazz-dark border-jazz-gold/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-jazz-gold">CTR Total</CardTitle>
              <Eye className="h-4 w-4 text-jazz-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{calculateTotalCTR()}%</div>
              <p className="text-xs text-white/70">
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-400" />
                +2.3% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="bg-jazz-dark border-jazz-gold/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-jazz-gold">Posição Média</CardTitle>
              <Target className="h-4 w-4 text-jazz-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{getAveragePosition()}</div>
              <p className="text-xs text-white/70">
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-400" />
                -0.8 posições
              </p>
            </CardContent>
          </Card>

          <Card className="bg-jazz-dark border-jazz-gold/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-jazz-gold">Cliques Totais</CardTitle>
              <MousePointer className="h-4 w-4 text-jazz-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {ctrData.reduce((sum, item) => sum + item.clicks, 0).toLocaleString()}
              </div>
              <p className="text-xs text-white/70">
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-400" />
                +18.2% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="bg-jazz-dark border-jazz-gold/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-jazz-gold">Impressões</CardTitle>
              <Search className="h-4 w-4 text-jazz-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {ctrData.reduce((sum, item) => sum + item.impressions, 0).toLocaleString()}
              </div>
              <p className="text-xs text-white/70">
                <TrendingUp className="inline w-3 h-3 mr-1 text-green-400" />
                +12.5% vs mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-jazz-dark/50">
            <TabsTrigger value="performance" className="text-jazz-gold">Performance</TabsTrigger>
            <TabsTrigger value="queries" className="text-jazz-gold">Queries</TabsTrigger>
            <TabsTrigger value="pages" className="text-jazz-gold">Páginas</TabsTrigger>
            <TabsTrigger value="tests" className="text-jazz-gold">A/B Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-jazz-dark border-jazz-gold/20">
              <CardHeader>
                <CardTitle className="text-jazz-gold">CTR ao Longo do Tempo</CardTitle>
                <CardDescription className="text-white/70">
                  Evolução do CTR nos últimos 7 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ctrData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e3bd68/20" />
                    <XAxis dataKey="date" stroke="#e3bd68" />
                    <YAxis stroke="#e3bd68" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a0000', 
                        border: '1px solid #e3bd68',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ctr" 
                      stroke="#e3bd68" 
                      strokeWidth={2}
                      dot={{ fill: '#e3bd68' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-jazz-dark border-jazz-gold/20">
              <CardHeader>
                <CardTitle className="text-jazz-gold">Impressões vs Cliques</CardTitle>
                <CardDescription className="text-white/70">
                  Comparação entre impressões e cliques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ctrData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e3bd68/20" />
                    <XAxis dataKey="date" stroke="#e3bd68" />
                    <YAxis stroke="#e3bd68" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a0000', 
                        border: '1px solid #e3bd68',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="impressions" fill="#800000" />
                    <Bar dataKey="clicks" fill="#e3bd68" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queries" className="space-y-6">
            <Card className="bg-jazz-dark border-jazz-gold/20">
              <CardHeader>
                <CardTitle className="text-jazz-gold">Top Queries Performance</CardTitle>
                <CardDescription className="text-white/70">
                  Principais consultas com melhor performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topQueries.map((query, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-jazz-dark/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{query.query}</h4>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span>{query.impressions.toLocaleString()} impressões</span>
                          <span>{query.clicks} cliques</span>
                          <span>Posição {query.position}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-jazz-gold">{query.ctr}%</div>
                        <div className={`flex items-center text-sm ${query.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {query.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {Math.abs(query.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages" className="space-y-6">
            <Card className="bg-jazz-dark border-jazz-gold/20">
              <CardHeader>
                <CardTitle className="text-jazz-gold">Performance por Página</CardTitle>
                <CardDescription className="text-white/70">
                  Distribuição de cliques por página
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pagePerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pagePerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a0000', 
                        border: '1px solid #e3bd68',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <Card className="bg-jazz-dark border-jazz-gold/20">
              <CardHeader>
                <CardTitle className="text-jazz-gold">Resultados A/B Testing</CardTitle>
                <CardDescription className="text-white/70">
                  Comparação de performance entre variações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {abTestResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-jazz-dark/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-white">{result.variation}</h4>
                          {result.winner && <Badge className="bg-green-600 text-white">Vencedor</Badge>}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span>{result.impressions.toLocaleString()} impressões</span>
                          <span>{result.clicks} cliques</span>
                          <span>Confiança: {result.confidence}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-jazz-gold">{result.ctr}%</div>
                        <div className="text-sm text-white/70">CTR</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CTRAnalyticsDashboard;