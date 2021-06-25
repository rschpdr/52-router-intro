## Rotas e navegação

Para nos ajudar com a navegação entre diferentes páginas no nosso webapp, vamos usar a ferramenta `react-router-dom`. Primeiro, precisamos instalar o pacote:

```bash
$ npm install react-router-dom
```

Para podermos usar o React Router, precisamos de 2 componentes: um roteador e as rotas. Comumente usamos o `BrowserRouter` como roteador:

```javascript
import { BrowserRouter, Route } from "react-router-dom";
```

> Lembrando que a sintaxe com as chaves é apenas uma desestruturação de objeto (object destructuring)

Para as rotas funcionarem, elas sempre precisam estar dentro de um roteador. Um roteador pode ter várias rotas:

```javascript
//...
import Homepage from "./Homepage";
import About from "./About";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Homepage} />
        <Route path="/about" component={About} />
      </BrowserRouter>
    </div>
  );
}

export default App;
```

O componente `Route` sempre deve receber 2 props obrigatórias: a prop `path`, que determina qual rota na URL do navegador vai renderizar o componente, e a prop `component` que determina o componente a ser renderizado

> Note que a prop `component` recebe uma referência de componente, e não uma invocação, ou seja, sem o `< />`

Como a prop `path` por padrão compara o valor dela com o valor da URL de forma inclusiva (ou seja, se a URL inclui o valor de path), podemos ter bugs ao definir algum caracter ou palavra repetido em dois paths diferentes:

```javascript
//...
import Homepage from "./Homepage";
import About from "./About";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={Homepage} />
        <Route path="/about" component={About} /> // Essa rota vai renderizar tanto
        o Homepage, quanto o About, pois `/about` inclui `/`
      </BrowserRouter>
    </div>
  );
}

export default App;
```

Para evitar isso, usamos a prop opcional `exact`

```javascript
//...
import Homepage from "./Homepage";
import About from "./About";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={Homepage} />
        <Route path="/about" component={About} /> // Agora, Homepage só será renderizado
        caso a URL do navegador seja exatamente `/`
      </BrowserRouter>
    </div>
  );
}

export default App;
```

### Componentes recorrentes em várias rotas e `<Link />`

Quando quisermos que um componente apareça em várias rotas diferentes (comum para cabeçalhos e rodapés, ou menus de navegação), basta renderizarmos esse componente fora de um `<Route />` que ele automaticamente aparecerá em todas as páginas:

```javascript
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar /> // Navbar aparecerá tanto em `/` quanto em `/about`
        <Route exact path="/" component={Homepage} />
        <Route path="/about" component={About} />
      </BrowserRouter>
    </div>
  );
}
```

Para podermos navegar sem recarregar a página (que é o principal intuito de usar o React e a arquitetura SPA (Single Page Application)), precisamos usar um componente especial chamado `<Link>`, que substitui as tags `<a></a>`:

```javascript
import { Link } from "react-router-dom";
// ...
//... Código do componente Navbar
<ul className="navbar-nav">
  <li className="nav-item">
    <Link className="nav-link" to="/">
      Home
    </Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/about">
      About
    </Link>
  </li>
</ul>;
//...
```

> No componente `<Link>`, usamos a prop `to` no lugar do atributo `href`

> OBS.: O componente `<Link>` deve ser usado apenas em navegações internas, ou seja, dentro do nosso próprio site. Caso você queira redirecionar para algum site externo, utilize o `<a></a>` normalmente.

Podemos usar o componente `<NavLink>` para links de navegação, pois o `<NavLink>` possui a prop `activeClassname`, que nos permite colocar uma classe do CSS para destacar o link que usuário está nesse momento. Aqui usamos a classe do CSS `active`, que vem do Bootstrap, para destacar o link atual da aplicação:

```javascript
import { Link, NavLink } from "react-router-dom";
// ...
//... Código do componente Navbar
<ul className="navbar-nav">
  <li className="nav-item">
    <NavLink activeClassName="active" className="nav-link" to="/">
      Home
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink activeClassName="active" className="nav-link" to="/about">
      About
    </NavLink>
  </li>
</ul>;
//...
```

### Parâmetros de rota

Quando queremos um componente genérico de exibição de conteúdo, porém com informações variáveis, podemos usar a URL do navegador como critério de busca dessa informação. Para facilitar esse processo, o React Router nos permite definir rotas com porcões variáveis, chamadas parâmetros de rota:

```javascript
//...
<Route path="/projects/:dinossauro" component={ProjectDetail} /> // a porção `:dinossauro` determina que essa porção da URL irá "dar match" em qualquer coisa, e disponibilizar essa "qualquer coisa", ou seja, qualquer porção de texto que estiver após a segunda barra, como uma parâmetro de rota
//...
```

Para usar parâmetros no código, acessamos um objeto de `props` injetado automaticamente pelo componente `Route` no componente que é renderizado na rota:

Vamos considerar que, para esse exemplo, nossa aplicação está na rota `localhost:3000/projects/qualquercoisa`:

```javascript
class ProjectDetail extends React.Component {
  state = {
    name: "",
    year: 0,
    technologies: "",
    description: "",
    picture: "",
  };

  render() {
    console.log(this.props.match.params.dinossauro); // Resultado deste console.log será: "qualquercoisa"
    return (
      <div className="container mt-5">
        <img src={this.state.picture} alt={this.state.name} />
        <h2>{this.state.name}</h2>
        <p>{this.state.year}</p>
        <p>{this.state.technologies}</p>
        <p>{this.state.description}</p>
      </div>
    );
  }
}

export default ProjectDetail;
```

> Note que, por termos definido na prop `path` do `Route` o valor `:dinossauro`, a propriedade do objeto `params`, que representa nossos parâmetros de rota, se chama `dinossauro`, e o valor da porção variável da URL ficou disponível como o valor dessa propriedade

Agora podemos usar o parâmetro de rota para pesquisar em um banco de dados, ou qualquer outra fonte de dados, exatamente o projeto específico que contém o `id` disponibilizado na rota.

Vamos considerar o seguinte arquivo `json` como sendo a fonte de dados:

```json
[
  {
    "id": "1a",
    "name": "The Frogger Clone",
    "year": 2017,
    "technologies": "JavaScript, jQuery",
    "description": "The first project game clone.",
    "picture": "https://nickjanetakis.com/assets/blog/cards/how-to-start-and-finish-any-web-app-project-678900795cfd6d4fa60e3655dd62ae9f61ef5e14b62ca62050e817e43e861f11.jpg"
  },
  {
    "id": "2b",
    "name": "iTravel",
    "year": 2017,
    "technologies": "Mongo DB, ExpressJS, NodeJS, JavaScript, HTML, CSS",
    "description": "Web App that allows logged in users to share their experiences about travel destinations.",
    "picture": "https://nickjanetakis.com/assets/blog/cards/how-to-start-and-finish-any-web-app-project-678900795cfd6d4fa60e3655dd62ae9f61ef5e14b62ca62050e817e43e861f11.jpg"
  },
  {
    "id": "3c",
    "name": "The Plan",
    "year": 2017,
    "technologies": "Mongo DB, ExpressJS, Angular2, NodeJS, JavaScript, HTML, CSS",
    "description": "Web App that allows logged in users to plan your next activity with your friends or business partners.",
    "picture": "https://nickjanetakis.com/assets/blog/cards/how-to-start-and-finish-any-web-app-project-678900795cfd6d4fa60e3655dd62ae9f61ef5e14b62ca62050e817e43e861f11.jpg"
  }
]
```

Ao definir um componente para exibir a lista de todos os projetos, podemos, em cada projeto, criar um link para os detalhes desse, injetando o `id` do projeto na rota a ser redirecionada:

```javascript
//... arquivo ProjectList.js
// Estamos dentro do método `map` que está renderizando um card de projeto para cada objeto da array
<Link to={`/projects/${project.id}`} className="btn btn-primary">
  View Details
</Link>
//...
```

Assim, quando o usuário clicar nesse link, a aplicação navegará para a rota deste projeto específico, o que carregará o componente `ProjectDetail` com o parâmetro contendo o id do projeto:

Por exemplo, supondo que o usuário clicou em "Ver Detalhes" do projeto "The Frogger Clone":

```javascript
class ProjectDetail extends React.Component {
  state = {
    name: "",
    year: 0,
    technologies: "",
    description: "",
    picture: "",
  };

  render() {
    console.log(this.props.match.params.dinossauro); // Resultado deste console.log será: "1a"
    return (
      <div className="container mt-5">
        <img src={this.state.picture} alt={this.state.name} />
        <h2>{this.state.name}</h2>
        <p>{this.state.year}</p>
        <p>{this.state.technologies}</p>
        <p>{this.state.description}</p>
      </div>
    );
  }
}

export default ProjectDetail;
```

Agora basta usarmos o id do projeto, que está disponível via parâmetro de rota, para pesquisar no arquivo json o projeto atual:

```javascript
import React from "react";
import projects from "../data/projects.json";

class ProjectDetail extends React.Component {
  state = {
    name: "",
    year: 0,
    technologies: "",
    description: "",
    picture: "",
  };

  searchProject = () => {
    if (!this.state.name) {
      const foundProject = projects.find((project) => {
        return project.id === this.props.match.params.dinossauro;
      }); // Pesquisando na array proveniente do arquivo json qual objeto tem o valor da propriedade `id` igual à string "1a"

      if (foundProject) {
        this.setState({ ...foundProject });
      }
    }
  };

  render() {
    console.log(this.props);
    this.searchProject();
    return (
      <div className="container mt-5">
        <img src={this.state.picture} alt={this.state.name} />
        <h2>{this.state.name}</h2>
        <p>{this.state.year}</p>
        <p>{this.state.technologies}</p>
        <p>{this.state.description}</p>
      </div>
    );
  }
}

export default ProjectDetail;
```
