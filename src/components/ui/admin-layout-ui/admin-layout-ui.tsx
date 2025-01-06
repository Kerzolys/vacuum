import { Footer } from "../../footer/footer"
import { Navbar } from "../../navbar/navbar"

export const AdminLayoutUI = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Navbar isAdmin isHeader isHorizontal/>
      {children}
    </div>
  )
}