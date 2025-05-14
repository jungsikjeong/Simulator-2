import RewardSceneLayout from '@/components/RewardSceneLayout'

export default function Jinjer() {
    return (
        <RewardSceneLayout
            images={[
                { src: '/reward/박정민_진저.png', label: '박정민_진저' },
                { src: '/reward/장원영_진저.png', label: '장원영_진저' },
            ]}
            bgColor="bg-green-100"
            borderColor="border-green-500"
            textColor="text-green-700"
            sceneText="스윗한 답변을 해준 당신은"
        />
    )
}