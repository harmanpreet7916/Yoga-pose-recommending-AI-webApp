import Navbar from './components/Navbar';
import ProductPage from './pages/Product';
export default function Home() {

  return (
    <main className=" w-screen min-h-screen  items-center justify-between bg-gradient-to-br  from-[#a0fabd] via-[#42a966] to-[#02c14b]">
      <div className='w-full flex   p-3  sticky '>
        
        <Navbar />
      </div>
      <div className='w-full mt-5 overflow-x-hidden'>
        <ProductPage />
      </div>
    </main>
  );
}
