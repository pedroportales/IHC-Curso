
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import {
  BookOpen,
  Play,
  Download,
  MessageSquare,
  Bell,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  ArrowLeft
} from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Logout realizado com sucesso');
    navigate('/');
  };

  // Dados simulados dos cursos do aluno
  const studentCourses = [
    {
      id: 1,
      title: 'Desenvolvimento de Games com Unity',
      progress: 65,
      totalModules: 12,
      completedModules: 8,
      totalHours: 40,
      completedHours: 26,
      instructor: 'Dr. Carlos Lima',
      lastAccess: '2024-06-03',
      modules: [
        { id: 1, title: 'Introdução ao Unity', completed: true, duration: '2h', type: 'video' },
        { id: 2, title: 'Configuração do Ambiente', completed: true, duration: '1.5h', type: 'video' },
        { id: 3, title: 'Criando seu Primeiro Jogo', completed: true, duration: '3h', type: 'video' },
        { id: 4, title: 'Physics e Colliders', completed: false, duration: '2.5h', type: 'video' },
        { id: 5, title: 'Sistema de Pontuação', completed: false, duration: '2h', type: 'video' }
      ]
    },
    {
      id: 2,
      title: 'Empreendedorismo Digital',
      progress: 80,
      totalModules: 8,
      completedModules: 6,
      totalHours: 25,
      completedHours: 20,
      instructor: 'Ana Rodrigues',
      lastAccess: '2024-06-02'
    },
    {
      id: 3,
      title: 'Programação Full Stack',
      progress: 30,
      totalModules: 15,
      completedModules: 4,
      totalHours: 60,
      completedHours: 18,
      instructor: 'Dr. Carlos Lima',
      lastAccess: '2024-05-28'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Nova aula disponível',
      message: 'Physics e Colliders - Desenvolvimento de Games',
      time: '2h atrás',
      read: false
    },
    {
      id: 2,
      title: 'Mentoria agendada',
      message: 'Sua mentoria está marcada para amanhã às 14h',
      time: '5h atrás',
      read: false
    },
    {
      id: 3,
      title: 'Certificado disponível',
      message: 'Parabéns! Seu certificado de Empreendedorismo está pronto',
      time: '1 dia atrás',
      read: true
    }
  ];

  const messages = [
    {
      id: 1,
      from: 'Dr. Carlos Lima',
      subject: 'Dúvida sobre Unity Physics',
      preview: 'Olá! Recebi sua pergunta sobre física no Unity...',
      time: '1h atrás',
      read: false
    },
    {
      id: 2,
      from: 'Ana Rodrigues',
      subject: 'Parabéns pelo progresso!',
      preview: 'Estou muito satisfeita com seu desempenho...',
      time: '2 dias atrás',
      read: true
    }
  ];

  const watchVideo = (moduleId) => {
    toast.success('Reproduzindo vídeo...');
    // Simular progresso do vídeo
    setTimeout(() => {
      toast.success('Progresso salvo automaticamente!');
    }, 2000);
  };

  const downloadMaterial = (materialName) => {
    toast.success(`Download de ${materialName} iniciado`);
  };

  if (!currentUser) {
    return <div>Carregando...</div>;
  }

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Básico': return 'bg-blue-500';
      case 'Empreendedor': return 'bg-purple-500';
      case 'Startup': return 'bg-gradient-to-r from-orange-500 to-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">EduTech Pro</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={`${getPlanColor(currentUser.plan)} text-white`}>
              {currentUser.plan}
            </Badge>
            <span className="text-white">Olá, {currentUser.name}</span>
            <Button onClick={handleLogout} variant="outline" className="border-white/20 text-black hover:bg-white/10">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-md border-white/20">
            <TabsTrigger value="courses" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Meus Cursos
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Progresso
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Mensagens
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Notificações
            </TabsTrigger>
          </TabsList>

          {/* Cursos */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentCourses.map((course) => (
                <Card key={course.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">{course.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      Professor: {course.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Progresso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="bg-white/20" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>
                        <span className="block">Módulos</span>
                        <span className="text-white font-semibold">
                          {course.completedModules}/{course.totalModules}
                        </span>
                      </div>
                      <div>
                        <span className="block">Horas</span>
                        <span className="text-white font-semibold">
                          {course.completedHours}/{course.totalHours}h
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Acessar Curso
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Modal do Curso */}
            {selectedCourse && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{selectedCourse.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      Módulos do curso
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedCourse(null)}
                    className="text-white hover:bg-white/10"
                  >
                    ✕
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedCourse.modules?.map((module) => (
                      <div key={module.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${module.completed ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                          <div>
                            <h4 className="text-white font-medium">{module.title}</h4>
                            <p className="text-gray-400 text-sm">{module.duration}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => watchVideo(module.id)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadMaterial(module.title)}
                            className="border-white/20 text-black hover:bg-white/10"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Progresso */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Estatísticas Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Cursos Iniciados</span>
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Horas Estudadas</span>
                    <span className="text-white font-semibold">64h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Certificados</span>
                    <span className="text-white font-semibold">1</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-400" />
                    Conquistas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      🏆
                    </div>
                    <div>
                      <p className="text-white font-medium">Primeiro Curso</p>
                      <p className="text-gray-400 text-sm">Completou seu primeiro curso</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      📚
                    </div>
                    <div>
                      <p className="text-white font-medium">Estudante Dedicado</p>
                      <p className="text-gray-400 text-sm">50+ horas de estudo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mensagens */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Caixa de Entrada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`p-4 rounded-lg cursor-pointer transition-colors ${message.read ? 'bg-white/5' : 'bg-purple-500/20'
                        }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{message.from}</h4>
                          <span className="text-gray-400 text-sm">{message.time}</span>
                        </div>
                        <h5 className="text-purple-300 text-sm mb-1">{message.subject}</h5>
                        <p className="text-gray-300 text-sm">{message.preview}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notificações */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notificações Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 rounded-lg transition-colors ${notification.read ? 'bg-white/5' : 'bg-blue-500/20'
                        }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{notification.title}</h4>
                          <span className="text-gray-400 text-sm">{notification.time}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
