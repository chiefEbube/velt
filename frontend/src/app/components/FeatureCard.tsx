interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="relative group">
            {/* Gradient border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>

            {/* Card content */}
            <div
                className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 h-full 
                      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
            >
                <div
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 flex items-center justify-center mb-4
                        shadow-[inset_0_2px_3px_rgba(255,255,255,0.1)]"
                >
                    <div className="text-blue-400">{icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-300">{description}</p>
            </div>
        </div>
    )
}