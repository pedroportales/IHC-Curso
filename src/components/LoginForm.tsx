
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { BookOpen, ArrowLeft } from 'lucide-react';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: ''
  });

  // Usuários demo para teste
  const demoUsers = {
    student: [
      { email: 'aluno1@demo.com', password: 'demo123', name: 'João Silva', plan: 'Básico' },
      { email: 'aluno2@demo.com', password: 'demo123', name: 'Maria Santos', plan: 'Empreendedor' },
      { email: 'aluno3@demo.com', password: 'demo123', name: 'Pedro Costa', plan: 'Startup' }
    ],
    teacher: [
      { email: 'professor1@demo.com', password: 'demo123', name: 'Dr. Carlos Lima', specialty: 'Desenvolvimento de Games' },
      { email: 'professor2@demo.com', password: 'demo123', name: 'Ana Rodrigues', specialty: 'Empreendedorismo' }
    ],
    admin: [
      { email: 'admin@demo.com', password: 'demo123', name: 'Administrador Sistema' }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      userType: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!formData.userType) {
      toast.error('Selecione o tipo de usuário');
      return;
    }

    const users = demoUsers[formData.userType];
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      const userData = {
        ...user,
        type: formData.userType,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      toast.success(`Bem-vindo(a), ${user.name}!`);
      
      // Redirecionar baseado no tipo de usuário
      switch (formData.userType) {
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'teacher':
          navigate('/teacher-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
      }
    } else {
      toast.error('Credenciais inválidas');
    }
  };

  const fillDemoCredentials = (userType) => {
    const user = demoUsers[userType][0];
    setFormData({
      email: user.email,
      password: user.password,
      userType: userType
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">EduTech Pro</h1>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Entrar na Plataforma</CardTitle>
            <CardDescription className="text-gray-300">
              Acesse sua conta para continuar aprendendo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-white">Tipo de Usuário</Label>
                <Select value={formData.userType} onValueChange={handleUserTypeChange}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Aluno</SelectItem>
                    <SelectItem value="teacher">Professor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Sua senha"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Entrar
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-gray-300 text-sm text-center mb-4">Credenciais Demo:</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('student')}
                  className="border-white/20 text-white hover:bg-white/10 text-xs"
                >
                  Aluno
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('teacher')}
                  className="border-white/20 text-white hover:bg-white/10 text-xs"
                >
                  Professor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('admin')}
                  className="border-white/20 text-white hover:bg-white/10 text-xs"
                >
                  Admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
