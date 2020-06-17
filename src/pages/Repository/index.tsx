import React, { useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoGit from '../../assets/1587379765556-attachment.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryForm {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryForm>();

  useEffect(() => {
    api.get(`/repos/${params.repository}`).then((test) => test.data);
  }, []);

  return (
    <>
      <Header>
        <img src={logoGit} alt="Github Explore" />
        <Link to="/">
          <FiChevronLeft size={16} />
          voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src="https://avatars1.githubusercontent.com/u/67072850?s=400&u=e18de359271c0c3305884882d956dd4f4cc47e25&v=4"
            alt=""
          />
          <div>
            <strong>facebook/react</strong>
            <p>
              A declarative, efficient, and flexible JavaScript library for
              building user interfaces.
            </p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1808</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>48</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="/#">
          <div>
            <strong>alguma coisa ai</strong>
            <p>Dev não colocou nenhuma descrição</p>
          </div>
          <FiChevronRight size={30} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
