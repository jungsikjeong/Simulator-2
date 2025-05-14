import RewardSceneLayout from '@/components/RewardSceneLayout'

export default function Grape() {
    return (
        <RewardSceneLayout
            images={[
                { src: '/reward/박정민_자몽.png', label: '박정민_자몽' },
                { src: '/reward/장원영_자몽.png', label: '장원영_자몽' },
            ]}
            bgColor="bg-pink-100"
            borderColor="border-pink-500"
            textColor="text-pink-700"
            sceneText="자몽처럼 톡 쏘는 답변을 해준 당신은"
        />
    )
}