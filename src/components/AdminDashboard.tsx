
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Settings, 
  BarChart3, 
  Plus,
  Edit,
  Trash2,
  UserPlus,
  TrendingUp,
  DollarSign,
  ArrowLeft
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createType, setCreateType] = useState('');

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

  // Dados simulados do sistema
  const systemStats = {
    totalStudents: 1247,
    totalTeachers: 23,
    totalCourses: 15,
    totalRevenue: 89750,
    activeUsers: 892,
    completionRate: 78
  };

  const courses = [
    {
      id: 1,
      title: 'Desenvolvimento de Games com Unity',
      instructor: 'Dr. Carlos Lima',
      students: 450,
      rating: 4.8,
      revenue: 22500,
      status: 'active'
    },
    {
      id: 2,
      title: 'Empreendedorismo Digital',
      instructor: 'Ana Rodrigues',
      students: 320,
      rating: 4.9,
      revenue: 18400,
      status: 'active'
    },
    {
      id: 3,
      title: 'Programação Full Stack',
      instructor: 'Dr. Carlos Lima',
      students: 280,
      rating: 4.7,
      revenue: 15600,
      status: 'active'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@exemplo.com',
      type: 'student',
      plan: 'Empreendedor',
      lastAccess: '2024-06-03',
      status: 'active'
    },
    {
      id: 2,
      name: 'Dr. Carlos Lima',
      email: 'carlos@exemplo.com',
      type: 'teacher',
      specialty: 'Desenvolvimento de Games',
      lastAccess: '2024-06-03',
      status: 'active'
    },
    {
      id: 3,
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      type: 'student',
      plan: 'Básico',
      lastAccess: '2024-06-02',
      status: 'active'
    }
  ];

  const handleCreateNew = (type) => {
    setCreateType(type);
    setShowCreateForm(true);
  };

  const handleSaveNew = () => {
    toast.success(`${createType} criado com sucesso!`);
    setShowCreateForm(false);
  };

  const handleEdit = (item, type) => {
    toast.success(`Editando ${type}: ${item.title || item.name}`);
  };

  const handleDelete = (item, type) => {
    toast.success(`${type} removido com sucesso!`);
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
            <Badge className="bg-red-500 text-white">Administrador</Badge>
            <span className="text-white">{currentUser.name}</span>
            <Button onClick={handleLogout} variant="outline" className="border-white/20 text-black hover:bg-white/10">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Alunos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemStats.totalStudents}</div>
              <div className="text-green-400 text-sm">+12% este mês</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-400" />
                Cursos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemStats.totalCourses}</div>
              <div className="text-green-400 text-sm">+3 novos</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
                Receita
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">R$ {systemStats.totalRevenue.toLocaleString()}</div>
              <div className="text-green-400 text-sm">+8% este mês</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                Taxa de Conclusão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemStats.completionRate}%</div>
              <div className="text-green-400 text-sm">+5% este mês</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-md border-white/20">
            <TabsTrigger value="courses" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Cursos
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Usuários
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Relatórios
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Gestão de Cursos */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gestão de Cursos</h2>
              <Button 
                onClick={() => handleCreateNew('Curso')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Curso
              </Button>
            </div>

            <div className="grid gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{course.title}</CardTitle>
                        <CardDescription className="text-gray-300">
                          Professor: {course.instructor}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(course, 'curso')}
                          className="border-white/20 text-black hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(course, 'curso')}
                          className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-300 block">Alunos</span>
                        <span className="text-white font-semibold">{course.students}</span>
                      </div>
                      <div>
                        <span className="text-gray-300 block">Avaliação</span>
                        <span className="text-white font-semibold">⭐ {course.rating}</span>
                      </div>
                      <div>
                        <span className="text-gray-300 block">Receita</span>
                        <span className="text-white font-semibold">R$ {course.revenue.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-300 block">Status</span>
                        <Badge className="bg-green-500 text-white">Ativo</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gestão de Usuários */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gestão de Usuários</h2>
              <Button 
                onClick={() => handleCreateNew('Usuário')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Button>
            </div>

            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{user.name}</h4>
                          <p className="text-gray-300 text-sm">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={
                              user.type === 'student' ? 'bg-blue-500' :
                              user.type === 'teacher' ? 'bg-green-500' : 'bg-red-500'
                            }>
                              {user.type === 'student' ? 'Aluno' : 
                               user.type === 'teacher' ? 'Professor' : 'Admin'}
                            </Badge>
                            {user.plan && (
                              <Badge variant="outline" className="border-white/20 text-white">
                                {user.plan}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">
                          Último acesso: {user.lastAccess}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(user, 'usuário')}
                          className="border-white/20 text-black hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(user, 'usuário')}
                          className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Relatórios */}
          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Relatórios do Sistema</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Engajamento dos Alunos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Usuários Ativos</span>
                    <span className="text-white font-semibold">{systemStats.activeUsers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Taxa de Retenção</span>
                    <span className="text-white font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Tempo Médio/Sessão</span>
                    <span className="text-white font-semibold">45min</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Performance dos Cursos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Cursos Concluídos</span>
                    <span className="text-white font-semibold">892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Avaliação Média</span>
                    <span className="text-white font-semibold">4.7/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Certificados Emitidos</span>
                    <span className="text-white font-semibold">743</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Configurações */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Configurações do Sistema</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Configurações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName" className="text-white">Nome da Plataforma</Label>
                    <Input 
                      id="siteName"
                      defaultValue="EduTech Pro"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail" className="text-white">Email de Suporte</Label>
                    <Input 
                      id="supportEmail"
                      defaultValue="suporte@edutechpro.com"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Salvar Configurações
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Backup e Segurança</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Último Backup</span>
                    <span className="text-white">03/06/2024 - 02:00</span>
                  </div>
                  <Button variant="outline" className="w-full border-white/20 text-black hover:bg-white/10">
                    Fazer Backup Agora
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-black hover:bg-white/10">
                    Ver Logs do Sistema
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal de Criação */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-white">Criar Novo {createType}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {createType === 'Curso' ? (
                  <>
                    <Input placeholder="Título do curso" className="bg-white/10 border-white/20 text-white" />
                    <Input placeholder="Professor responsável" className="bg-white/10 border-white/20 text-white" />
                    <Textarea placeholder="Descrição do curso" className="bg-white/10 border-white/20 text-white" />
                  </>
                ) : (
                  <>
                    <Input placeholder="Nome completo" className="bg-white/10 border-white/20 text-white" />
                    <Input placeholder="Email" className="bg-white/10 border-white/20 text-white" />
                    <select className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white">
                      <option value="student">Aluno</option>
                      <option value="teacher">Professor</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </>
                )}
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSaveNew}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Salvar
                  </Button>
                  <Button 
                    onClick={() => setShowCreateForm(false)}
                    variant="outline"
                    className="flex-1 border-white/20 text-black hover:bg-white/10"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
