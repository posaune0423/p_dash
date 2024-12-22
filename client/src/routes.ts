import { RouteProps } from 'react-router-dom'
import HomePage from './pages/home'
import LandingPage from './pages'
import GameHomePage from './pages/game'
import GameDetailPage from './pages/game/detail'
import MyPage from './pages/my'
import HistoryPage from './pages/history'

export const routes = [
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/home',
    Component: HomePage,
  },
  {
    path: '/game',
    Component: GameHomePage,
  },
  {
    path: '/game/:stageId',
    Component: GameDetailPage,
  },
  {
    path: '/my',
    Component: MyPage,
  },
  {
    path: '/history',
    Component: HistoryPage,
  },
] as const satisfies RouteProps[]
