import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Title, Form, Repositories, Loading, Error } from './styles';
import logoGit from '../../assets/1587379765556-attachment.svg';
import LoadingIcon from '../../assets/loading.gif';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite autor/nome do repositório');
      return;
    }

    try {
      setShowLoading(true);
      const { data } = await api.get<Repository>(`/repos/${newRepo}`);
      setNewRepo('');
      setInputError('');
      const repository = data;
      setRepositories([...repositories, repository]);
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <img src={logoGit} alt="Github Explore" />
      <Title>Explore repositórios no Github.</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite autor/nome do Repositorio"
        />
        <button type="submit">
          {(showLoading && <Loading src={LoadingIcon} />) || 'Pesquisar'}
        </button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            to={`/repositories/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>
                {repository.description || 'Dev não colocou nenhuma descrição'}
              </p>
            </div>
            <FiChevronRight size={30} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
