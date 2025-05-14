import RewardSceneLayout from '@/components/RewardSceneLayout'

export default function Plain() {
    return (
        <RewardSceneLayout
            images={[
                { src: '/reward/박정민_플레인.png', label: '박정민_플레인' },
                { src: '/reward/장원영_플레인.png', label: '장원영_플레인' },
            ]}
            bgColor="bg-slate-100"
            borderColor="border-slate-500"
            textColor="text-slate-700"
            sceneText="깔끔담백한 답변을 해준 당신은"
        />
    )
}