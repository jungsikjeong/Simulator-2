import type { SceneKey } from '@/modules/scene-key.type'
import StartScene1 from '@/routes/_app/-components/StartScene1'
import StartScene2 from '@/routes/_app/-components/StartScene2'
import WorryScene from '@/routes/_app/-components/WorryScene'
import CardSelectScene1 from '@/routes/_app/-components/CardSelectScene'
import CardSelectActionScene from '@/routes/_app/-components/CardSelectActionScene'
import CardRevealScene from '@/routes/_app/-components/CardRevealScene'
import ReplayScene from '@/routes/_app/-components/ReplayScene'
import EndingScene from '@/routes/_app/-components/EndingScene'
type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

type SceneComponent = (props: SceneProps) => React.JSX.Element

// 각 씬 키에 해당하는 컴포넌트를 매핑하는 객체
export const SceneComponentMap: Record<SceneKey, SceneComponent> = {
  start1: StartScene1,
  start2: StartScene2,
  worry: WorryScene,
  cardSelect: CardSelectScene1,
  cardSelectAction: CardSelectActionScene,
  cardReveal: CardRevealScene,
  replay: ReplayScene,
  ending: EndingScene,
}
