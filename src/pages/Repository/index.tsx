import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoGit from '../../assets/1587379765556-attachment.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryForm {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryForm>();
  const [repositoryInfo, setRepositoryInfo] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.get(`/repos/${params.repository}`).then((response) => {
      setRepositoryInfo(response.data);
    });

    api.get(`/repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoGit} alt="Github Explore" />
        <Link to="/">
          <FiChevronLeft size={16} />
          voltar
        </Link>
      </Header>

      {repositoryInfo && (
        <RepositoryInfo>
          <header>
            <img
              src={repositoryInfo.owner.avatar_url}
              alt={repositoryInfo.owner.login}
            />
            <div>
              <strong>{repositoryInfo.full_name}</strong>
              <p>{repositoryInfo.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repositoryInfo.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repositoryInfo.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repositoryInfo.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues &&
          issues.map((issue) => (
            <a
              key={issue.id}
              target="_blank"
              rel="noreferrer"
              href={issue.html_url}
            >
              <div key={issue.id}>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={30} />
            </a>
          ))}
      </Issues>
    </>
  );
};

export default Repository;
