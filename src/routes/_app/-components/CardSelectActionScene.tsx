'use client'

import SelectActionScene from '@/components/SelectActionScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useGetCurrentMemberName } from '@/service/member/useGetMember'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function CardSelectActionScene({ onSceneChange }: SceneProps) {
    const { data: currentMemberName } = useGetCurrentMemberName()

    return (
        <SelectActionScene
            onSceneChange={onSceneChange}
            bgImage="/박정민_4.png"
            chunks={[
                { content: `[${currentMemberName}]!\n` },
                { content: '넌 이 카드를 뽑았어\n' },
                { content: '부디 이 카드가 너의 해답이' },
                { content: '되면 좋겠어!' },
            ]}
            nextScene="cardReveal"
        />
    )
}