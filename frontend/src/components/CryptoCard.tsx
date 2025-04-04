import Image from "next/image";

interface CryptoCardProps {
    name: string;
    symbol: string;
    color: string;
    iconPath?: string;
}

export default function CryptoCard({ name, symbol, color, iconPath }: CryptoCardProps) {
    return (
      <div className="relative group">
        {/* Gradient border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>
  
        {/* Card content */}
        <div
          className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 w-[160px] flex flex-col items-center
                      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
        >
          <div className="relative mb-4">
            {/* Coin outer glow */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-30 blur-sm`}></div>
  
            {/* Coin base */}
            <div
              className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${color} flex items-center justify-center
                          shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_2px_3px_rgba(255,255,255,0.4)]
                          border border-white/10`}
            >
              {/* Coin icon or symbol */}
              <div
                className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 flex items-center justify-center
                            shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-center justify-center w-full h-full overflow-hidden rounded-full">
                  <Image
                    src={iconPath || "/placeholder.svg"}
                    alt={symbol}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
  
              {/* Highlight effect */}
              <div className="absolute top-0 left-1/4 right-1/4 h-1/5 bg-white/20 rounded-full blur-[1px]"></div>
            </div>
          </div>
  
          <h3 className="text-lg font-medium">{name}</h3>
          <span className="text-sm text-gray-400">{symbol}</span>
        </div>
      </div>
    )
  }
  