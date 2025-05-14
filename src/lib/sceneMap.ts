import type { SceneKey } from '@/modules/scene-key.type'
import StartScene from '@/routes/_app/-components/StartScene'
import Part1 from '@/routes/_app/-components/part-1'
import Part1SceneASuccess1 from '@/routes/_app/-components/part-1/SceneA/Success1'
import Part1SceneASuccess2 from '@/routes/_app/-components/part-1/SceneA/Success2'
import Part1SceneAFail1 from '@/routes/_app/-components/part-1/SceneA/Fail1'
import Part1SceneAFail2 from '@/routes/_app/-components/part-1/SceneA/Fail2'
import Part1SceneBMain from '@/routes/_app/-components/part-1/SceneB/main'
import Part1SceneBSuccess from '@/routes/_app/-components/part-1/SceneB/Success'
import Part1SceneBFail1 from '@/routes/_app/-components/part-1/SceneB/Fail1'
import Part1SceneBFail2 from '@/routes/_app/-components/part-1/SceneB/Fail2'
import Part2 from '@/routes/_app/-components/part-2'
import Part2SceneAMain from '@/routes/_app/-components/part-2/SceneA/main'
import Part2SceneASuccess from '@/routes/_app/-components/part-2/SceneA/Success'
import Part2SceneAFail1 from '@/routes/_app/-components/part-2/SceneA/Fail1'
import Part2SceneAFail2 from '@/routes/_app/-components/part-2/SceneA/Fail2'
import Part3 from '@/routes/_app/-components/part-3'
import Part3SceneAMain from '@/routes/_app/-components/part-3/SceneA/main'
import Part3SceneASuccess from '@/routes/_app/-components/part-3/SceneA/Success'
import Part3SceneAFail from '@/routes/_app/-components/part-3/SceneA/Fail'
import Part4 from '@/routes/_app/-components/part-4'
import Part4SceneAMain from '@/routes/_app/-components/part-4/SceneA/main'
import Part4SceneASuccess1 from '@/routes/_app/-components/part-4/SceneA/Success1'
import Part4SceneAFail from '@/routes/_app/-components/part-4/SceneA/Fail'
import Part4SceneBMain from '@/routes/_app/-components/part-4/SceneB/main'
import Part4SceneBNext1 from '@/routes/_app/-components/part-4/SceneB/next1'
import Part4SceneBNext2 from '@/routes/_app/-components/part-4/SceneB/next2'
import Part4SceneBNext3 from '@/routes/_app/-components/part-4/SceneB/next3'
import Part4SceneBNext4 from '@/routes/_app/-components/part-4/SceneB/next4'
import Part4SceneBNext5 from '@/routes/_app/-components/part-4/SceneB/next5'
import Ending from '@/routes/_app/-components/ending'
import EndingNext1 from '@/routes/_app/-components/ending/next1'
import EndingNext2 from '@/routes/_app/-components/ending/next2'
import Plain from '@/routes/_app/-components/reward/plain'
import Jinjer from '@/routes/_app/-components/reward/jinjer'
import Lemon from '@/routes/_app/-components/reward/lemon'
import Grape from '@/routes/_app/-components/reward/grape'


type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

type SceneComponent = (props: SceneProps) => React.JSX.Element

// 각 씬 키에 해당하는 컴포넌트를 매핑하는 객체
export const SceneComponentMap: Record<SceneKey, SceneComponent> = {
  start: StartScene,
  part1: Part1,
  part1SceneASuccess1: Part1SceneASuccess1,
  part1SceneASuccess2: Part1SceneASuccess2,
  part1SceneAFail1: Part1SceneAFail1,
  part1SceneAFail2: Part1SceneAFail2,
  part1SceneBMain: Part1SceneBMain,
  part1SceneBSuccess: Part1SceneBSuccess,
  part1SceneBFail1: Part1SceneBFail1,
  part1SceneBFail2: Part1SceneBFail2,
  part2: Part2,
  part2SceneAMain: Part2SceneAMain,
  part2SceneASuccess: Part2SceneASuccess,
  part2SceneAFail1: Part2SceneAFail1,
  part2SceneAFail2: Part2SceneAFail2,
  part3: Part3,
  part3SceneAMain: Part3SceneAMain,
  part3SceneASuccess: Part3SceneASuccess,
  part3SceneAFail: Part3SceneAFail,
  part4: Part4,
  part4SceneAMain: Part4SceneAMain,
  part4SceneASuccess1: Part4SceneASuccess1,
  part4SceneAFail: Part4SceneAFail,
  part4SceneBMain: Part4SceneBMain,
  part4SceneBNext1: Part4SceneBNext1,
  part4SceneBNext2: Part4SceneBNext2,
  part4SceneBNext3: Part4SceneBNext3,
  part4SceneBNext4: Part4SceneBNext4,
  part4SceneBNext5: Part4SceneBNext5,
  ending: Ending,
  endingNext1: EndingNext1,
  endingNext2: EndingNext2,
  plain: Plain,
  jinjer: Jinjer,
  lemon: Lemon,
  grape: Grape,
}
