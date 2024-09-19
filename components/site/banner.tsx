import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

const MobileBanner = () => {
  return (
    <div className="flex flex-row justify-center items-center h-full bg-orange-300 text-zinc-900 font-bold text-xs space-x-2">
      <span>Please withdraw liquidity from deregistered pools</span>
      <ExclamationTriangleIcon />
    </div>
  )
}

const DesktopBanner = () => {
  return (
    <div className="flex flex-row justify-center items-center h-full bg-orange-300 text-zinc-900 font-bold text-base space-x-2">
      <span>Please withdraw liquidity from deregistered pools</span>
      <ExclamationTriangleIcon />
    </div>
  )
}

export const Banner = () => {
  return (
    <>
      <div className="block lg:hidden h-8">
        <MobileBanner />
      </div>
      <div className="hidden lg:block h-10">
        <DesktopBanner />
      </div>
    </>
  )
}
