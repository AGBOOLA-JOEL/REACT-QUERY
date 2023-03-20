import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage } from "./components/Home.page";

import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";
import { RQSuperHeroesHooked } from "./components/RQSuperHeroesHooked";
import { RQSuperHeroSingle } from "./components/RQSuperHeroSingle";
import { ParallelQueriesPage } from "./components/ParallelQueriesPage";
import { DynamicParallelPage } from "./components/DynamicParallelPage";
import DependentQueriesPage from "./components/DependentQueriesPage";
import { PaginatedQueriesPage } from "./components/PaginatedQueriesPage";
import { InfiniteQueries } from "./components/InfiniteQueries";
import { RQSuperHeroPost } from "./components/RQSuperHeroPost";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/post-request">
              <RQSuperHeroPost />
            </Route>
            <Route path="/infinite">
              <InfiniteQueries />
            </Route>
            <Route path="/pagination">
              <PaginatedQueriesPage />
            </Route>
            <Route path="/dep-que">
              <DependentQueriesPage email="joel@example.com" />
            </Route>
            <Route path="/dynamic-parallel">
              <DynamicParallelPage heroIds={[1, 3]} />
            </Route>
            <Route path="/pq-page">
              <ParallelQueriesPage />
            </Route>
            <Route path="/single/:heroId">
              <RQSuperHeroSingle />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesHooked />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
