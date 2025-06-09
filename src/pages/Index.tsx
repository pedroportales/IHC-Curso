import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, TrendingUp, Gamepad2, Code, DollarSign } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Verificar se existe usuário logado
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
    }
  }, []);

  useEffect(() => {
    // Redirecionar para dashboard baseado no tipo de usuário
    if (currentUser) {
      switch (currentUser.type) {
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'teacher':
          navigate('/teacher-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          break;
      }
    }
  }, [currentUser, navigate]);

  const handleLogin = () => {
    navigate('/login');
  };

  const plans = [
    {
      name: 'Básico',
      price: 'R$ 197',
      period: '/mês',
      color: 'bg-blue-500',
      features: [
        'Acesso completo à plataforma EAD',
        'Grupo exclusivo no WhatsApp',
        'Certificado de conclusão',
        'Suporte básico via chat'
      ]
    },
    {
      name: 'Empreendedor',
      price: 'R$ 397',
      period: '/mês',
      color: 'bg-purple-500',
      popular: true,
      features: [
        'Tudo do plano Básico',
        'Mentorias online semanais',
        'Acesso a eventos exclusivos',
        'Cursos extras de negócios',
        'Suporte prioritário'
      ]
    },
    {
      name: 'Startup',
      price: 'R$ 797',
      period: '/mês',
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      features: [
        'Tudo do plano Empreendedor',
        'Programa de incubação',
        'Modelagem de negócios personalizada',
        'Feedbacks especializados',
        'Contrato de parceria (¼ do negócio)',
        'Acesso direto aos fundadores'
      ]
    }
  ];

  const courses = [
    {
      title: 'Desenvolvimento de Games com Unity',
      description: 'Aprenda a criar jogos profissionais do zero',
      icon: <Gamepad2 className="w-8 h-8" />,
      duration: '40h',
      students: 1250
    },
    {
      title: 'Programação Full Stack',
      description: 'Domine frontend e backend para web',
      icon: <Code className="w-8 h-8" />,
      duration: '60h',
      students: 2100
    },
    {
      title: 'Empreendedorismo Digital',
      description: 'Transforme ideias em negócios lucrativos',
      icon: <TrendingUp className="w-8 h-8" />,
      duration: '25h',
      students: 890
    },
    {
      title: 'Estratégias de Monetização',
      description: 'Aprenda diferentes formas de gerar receita',
      icon: <DollarSign className="w-8 h-8" />,
      duration: '20h',
      students: 650
    }
  ];

  // Don't render the landing page if user is logged in (will be redirected)
  if (currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">EduTech Pro</h1>
          </div>
          <Button onClick={handleLogin} className="bg-purple-600 hover:bg-purple-700">
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Transforme sua
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Carreira</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Plataforma completa de ensino para Negócios, Empreendedorismo e Desenvolvimento de Jogos e Software
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
            Começar Agora
          </Button>
          <Button size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-100 text-lg px-8 py-6">
            Ver Cursos
          </Button>
        </div>
      </section>

      {/* Courses Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Nossos Cursos</h2>
          <p className="text-gray-300 text-lg">Aprenda com especialistas da indústria</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="text-purple-400 mb-2">{course.icon}</div>
                <CardTitle className="text-white">{course.title}</CardTitle>
                <CardDescription className="text-gray-300">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{course.duration}</span>
                  <span>{course.students} alunos</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Plans Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Escolha seu Plano</h2>
          <p className="text-gray-300 text-lg">Diferentes níveis de acesso para suas necessidades</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative bg-white/10 backdrop-blur-md border-white/20 hover:scale-105 transition-all duration-300 ${plan.popular ? 'ring-2 ring-purple-400' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Mais Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${plan.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-white">
                  {plan.price}<span className="text-lg text-gray-300">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 EduTech Pro. Todos os direitos reservados.</p>
            <p className="mt-2">Transformando carreiras através da educação de qualidade.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
