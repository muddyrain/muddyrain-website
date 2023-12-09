'use client'
export const Loading = () => {
  return (
    <div className="w-36 h-4 my-4 justify-between flex relative mx-auto">
      {/* 粉色方块 */}
      <div className={`w-4 h-4 loading-slide`}>
        <div className="absolute w-4 h-4 rounded-[15%] shadow-md bg-pink-500"></div>
      </div>
      {/* 蓝色方块 */}
      <div className="flex justify-between w-24 ">
        <div className="w-4 h-4 loading-jump-off-1">
          <div className="absolute w-4 h-4 rounded-[15%] shadow-md bg-blue-500 loading-jump-down-1 brightness-100"></div>
        </div>
        <div className="w-4 h-4 loading-jump-off-2">
          <div className="absolute w-4 h-4 rounded-[15%] shadow-md bg-blue-500 loading-jump-down-2 brightness-[1.15]"></div>
        </div>
        <div className="w-4 h-4 loading-jump-off-3">
          <div className="absolute w-4 h-4 rounded-[15%] shadow-md bg-blue-500 loading-jump-down-3 brightness-[1.3]"></div>
        </div>
        <div className="w-4 h-4 loading-jump-off-4">
          <div className="absolute w-4 h-4 rounded-[15%] shadow-md bg-blue-500 loading-jump-down-4 brightness-[1.5]"></div>
        </div>
      </div>
    </div>
  )
}
