import RewardSceneLayout from '@/components/RewardSceneLayout'

export default function Lemon() {
    return (
        <RewardSceneLayout
            images={[
                { src: '/reward/박정민_레몬.png', label: '박정민_레몬' },
                { src: '/reward/장원영_레몬.png', label: '장원영_레몬' },
            ]}
            bgColor="bg-yellow-100"
            borderColor="border-yellow-500"
            textColor="text-yellow-700"
            sceneText="청량한 답변을 해준 당신은"
        />
    )
}