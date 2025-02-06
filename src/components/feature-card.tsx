interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="text-center p-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#F16827] hover:shadow-lg hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-full  flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ">
                {icon}
            </div>
            <h3 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-white">{title}</h3>
            <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-white">{description}</p>
        </div>
    )
}
