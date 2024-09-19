import DesktopHeader from './desktop-header'
import MobileHeader from './mobile-header'

export default function NavBar() {
  return (
    <>
      <div className="hidden">
        <MobileHeader />
      </div>
      <div className="block">
        <DesktopHeader />
      </div>
    </>
  )
}
