
interface HomeProps {
  count: number;
}

import Image from 'next/image'
import appCells from '../assets/app-cells.png'
import logo from '../assets/logo.svg'
import avatares from '../assets/avatares.png'
import check from '../assets/check.svg'

export default function Home({count}:HomeProps) {
  return (
    <div>
      <main>
        <Image src={logo} quality={100} alt="logo" />

        <h1>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div>
          <Image src={avatares} quality={100} alt="pessoas" />
          <strong>
            <span>+12.278</span> pessoas já estão usando
          </strong>
        </div>

        <form>
          <input type="text" required placeholder='Qual nome do seu bolão' />
          <button type="submit">Criar meu bolão</button>
        </form>

        <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div>
          
          <div>
            <Image src={check} quality={100} alt="" />
            <div>
              <span>+2.398</span>
              <span>bolões criador</span>
            </div>
          </div>

          <div>
            <Image src={check} quality={100} alt="" />
            <div>
              <span>+2.398</span>
              <span>bolões criador</span>
            </div>
          </div>

        </div>
      </main>

      <Image src={appCells} quality={100} alt="Dois celulars exibindo previa da verção mobile" />
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const res = await fetch('http://localhost:3333/pools/count')
//   const data = await res.json()

//   return {
//     props: {
//       count: data,
//     }
//   }
// } 