
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  BookOpen, 
  Users, 
  Upload, 
  Send, 
  BarChart3, 
  Calendar,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newMessage, setNewMessage] = useState({ subject: '', content: '', recipients: 'all' });

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

  // Dados simulados das turmas do professor
  const teacherClasses = [
    {
      id: 1,
      name: 'Desenvolvimento de Games - Turma A',
      course: 'Unity Fundamentals',
      students: 45,
      totalModules: 12,
      progress: 68,
      lastActivity: '2024-06-03',
      studentList: [
        { id: 1, name: 'João Silva', progress: 85, lastAccess: '2024-06-03' },
        { id: 2, name: 'Maria Santos', progress: 72, lastAccess: '2024-06-02' },
        { id: 3, name: 'Pedro Costa', progress: 90, lastAccess: '2024-06-03' },
        { id: 4, name: 'Ana Oliveira', progress: 45, lastAccess: '2024-05-30' }
      ]
    },
    {
      id: 2,
      name: 'Desenvolvimento de Games - Turma B',
      course: 'Unity Avançado',
      students: 32,
      totalModules: 15,
      progress: 45,
      lastActivity: '2024-06-02',
      studentList: [
        { id: 5, name: 'Carlos Lima', progress: 78, lastAccess: '2024-06-02' },
        { id: 6, name: 'Lucia Santos', progress: 82, lastAccess: '2024-06-01' }
      ]
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: 'João Silva',
      subject: 'Dúvida sobre Physics',
      message: 'Professor, estou com dificuldade para entender como aplicar física nos objetos...',
      time: '2h atrás',
      replied: false
    },
    {
      id: 2,
      from: 'Maria Santos',
      subject: 'Projeto Final',
      message: 'Gostaria de tirar algumas dúvidas sobre o projeto final...',
      time: '5h atrás',
      replied: true
    }
  ];

  const handleUploadMaterial = () => {
    toast.success('Material enviado com sucesso!');
  };

  const handleSendMessage = () => {
    if (!newMessage.subject || !newMessage.content) {
      toast.error('Preencha todos os campos');
      return;
    }
    toast.success('Mensagem enviada com sucesso!');
    setNewMessage({ subject: '', content: '', recipients: 'all' });
  };

  if (!currentUser) {
    return <div>Carregando...</div>;
  }

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
            <Badge className="bg-green-500 text-white">Professor</Badge>
            <span className="text-white">Prof. {currentUser.name}</span>
            <Button onClick={handleLogout} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-md border-white/20">
            <TabsTrigger value="classes" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Minhas Turmas
            </TabsTrigger>
            <TabsTrigger value="materials" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Materiais
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Mensagens
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Relatórios
            </TabsTrigger>
          </TabsList>

          {/* Turmas */}
          <TabsContent value="classes" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {teacherClasses.map((classItem) => (
                <Card key={classItem.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">{classItem.name}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {classItem.course}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-300 block">Alunos</span>
                        <span className="text-white font-semibold flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {classItem.students}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-300 block">Módulos</span>
                        <span className="text-white font-semibold">
                          {classItem.totalModules}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Progresso Médio</span>
                        <span>{classItem.progress}%</span>
                      </div>
                      <Progress value={classItem.progress} className="bg-white/20" />
                    </div>

                    <Button 
                      onClick={() => setSelectedClass(classItem)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Ver Detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Modal de Detalhes da Turma */}
            {selectedClass && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{selectedClass.name}</CardTitle>
                    <CardDescription className="text-gray-300">
                      Detalhes da turma e progresso dos alunos
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedClass(null)}
                    className="text-white hover:bg-white/10"
                  >
                    ✕
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <div className="space-y-4">
                      {selectedClass.studentList.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">{student.name.charAt(0)}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{student.name}</h4>
                              <p className="text-gray-400 text-sm">Último acesso: {student.lastAccess}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">{student.progress}%</div>
                            <Progress value={student.progress} className="w-20 bg-white/20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Materiais */}
          <TabsContent value="materials" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Enviar Material
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="materialTitle" className="text-white">Título do Material</Label>
                    <Input 
                      id="materialTitle"
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Ex: Aula 5 - Physics e Colliders"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="materialType" className="text-white">Tipo</Label>
                    <select className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white">
                      <option value="video">Vídeo</option>
                      <option value="document">Documento</option>
                      <option value="exercise">Exercício</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="materialDescription" className="text-white">Descrição</Label>
                  <Textarea 
                    id="materialDescription"
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Descreva o conteúdo do material..."
                  />
                </div>

                <div className="flex space-x-4">
                  <input type="file" accept="video/*,application/pdf" className="hidden" id="fileUpload" />
                  <Button 
                    onClick={() => document.getElementById('fileUpload').click()}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Escolher Arquivo
                  </Button>
                  <Button onClick={handleUploadMaterial} className="bg-purple-600 hover:bg-purple-700">
                    Enviar Material
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mensagens */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Mensagens Recebidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <div className="space-y-4">
                      {recentMessages.map((message) => (
                        <div key={message.id} className="p-4 bg-white/5 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-medium">{message.from}</h4>
                            <Badge className={message.replied ? 'bg-green-500' : 'bg-orange-500'}>
                              {message.replied ? 'Respondida' : 'Pendente'}
                            </Badge>
                          </div>
                          <h5 className="text-purple-300 text-sm mb-1">{message.subject}</h5>
                          <p className="text-gray-300 text-sm mb-2">{message.message}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-xs">{message.time}</span>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Responder
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipients" className="text-white">Para</Label>
                    <select 
                      className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
                      value={newMessage.recipients}
                      onChange={(e) => setNewMessage({...newMessage, recipients: e.target.value})}
                    >
                      <option value="all">Todas as turmas</option>
                      <option value="turmaA">Turma A</option>
                      <option value="turmaB">Turma B</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="messageSubject" className="text-white">Assunto</Label>
                    <Input 
                      id="messageSubject"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Assunto da mensagem"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="messageContent" className="text-white">Mensagem</Label>
                    <Textarea 
                      id="messageContent"
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                      className="bg-white/10 border-white/20 text-white h-32"
                      placeholder="Digite sua mensagem..."
                    />
                  </div>

                  <Button onClick={handleSendMessage} className="w-full bg-purple-600 hover:bg-purple-700">
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Relatórios */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                    Engajamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Taxa de Conclusão</span>
                      <span className="text-white font-semibold">73%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Tempo Médio</span>
                      <span className="text-white font-semibold">2.5h/dia</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Satisfação</span>
                      <span className="text-white font-semibold">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-400" />
                    Alunos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total de Alunos</span>
                      <span className="text-white font-semibold">77</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Ativos esta semana</span>
                      <span className="text-white font-semibold">65</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Novos este mês</span>
                      <span className="text-white font-semibold">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                    Esta Semana
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Aulas Ministradas</span>
                      <span className="text-white font-semibold">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Materiais Enviados</span>
                      <span className="text-white font-semibold">15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Mensagens</span>
                      <span className="text-white font-semibold">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
