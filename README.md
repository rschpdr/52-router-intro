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
