import { SceneComponentMap } from '@/lib/sceneMap'
import type { SceneKey } from '@/modules/scene-key.type'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import StartScene from './-components/StartScene1'

export const Route = createFileRoute('/_app/')({
  component: App,
})

export default function App() {
  const [scene, setScene] = useState<SceneKey>('start1')

  const handleSceneChange = useCallback((scene: SceneKey) => {
    setScene(scene)
  }, [])

  if (scene === 'start1') {
    return <StartScene onSceneChange={handleSceneChange} />
  }

  const SceneComponent = SceneComponentMap[scene]

  return <SceneComponent onSceneChange={handleSceneChange} />
}
