import { ToastContainer, toast } from 'react-toastify';
import "./globals.css";

const layout = ({children}) => {
  return (
   <html>
    <body>
       <div>
      <ToastContainer />
      {children}
    </div>
    </body>
   </html>
  )
}

export default layout
