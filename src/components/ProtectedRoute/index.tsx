import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const { user, loading } = useAuth();

  //Enquanto a aplicação verifica se o usuário está logado,
  if (loading) {
    return <div>Verificando autenticação...</div>;
  }
  //Após a verificação, se não houver 'user', redirecionamos para a home.
  if (!user) {
    // O componente <Navigate> do React Router faz o redirecionamento.
    // 'replace' impede que o usuário use o botão "voltar" do navegador para
    return <Navigate to="/" replace />;
  }
  //  Se o usuário está logado, renderizamos a página protegida.
  return <>{children}</>;
};

export default ProtectedRoute;