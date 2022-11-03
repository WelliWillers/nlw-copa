
import Image from 'next/image'
import appCells from '../assets/app-cells.png'
import logo from '../assets/logo.svg'
import avatares from '../assets/avatares.png'
import check from '../assets/check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'
import { GetStaticProps } from 'next'

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({poolCount, guessCount, userCount}:HomeProps) {

  const [pool, setPool] = useState('')

  async function createPool(event: FormEvent){
    event.preventDefault()

    await api.post('pools', {
      title: pool
    })
      .then(async (response) => {
        const { code } = response.data

        await navigator.clipboard.writeText(code)

        alert('Bolão criado com sucesso e copiado para a área de transferencia!')
        setPool('')
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
      <main>
        <Image src={logo} quality={100} alt="logo" />

        <h1 className='mt-16 text-white text-bold text-5xl leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex items-center gap-2 '>
          <Image src={avatares} quality={100} alt="pessoas" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input onChange={(e) => setPool(e.target.value)} value={pool} className='flex-1 px-6 py-4 rounded text-gray-100 text-sm border border-gray-600 bg-gray-800' type="text" required placeholder='Qual nome do seu bolão' />
          <button className='bg-yellow-500 rounded px-6 py-4 font-bold text-gray-900 text-sm uppercase hover:brightness-75' type="submit">Criar meu bolão</button>
        </form>

        <p className='mt-4 text-gray-300 text-sm leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-stretch text-gray-100'>

          <div className='flex gap-6'>
            <Image src={check} quality={100} alt="" />
            <div className='flex flex-col'>
              <span className='text-2xl font-bold'>+{poolCount}</span>
              <span>bolões criador</span>
            </div>
          </div>

          <div className='w-px bg-gray-600'/>

          <div className='flex gap-6'>
            <Image src={check} quality={100} alt="" />
            <div className='flex flex-col'>
              <span className='text-2xl font-bold'>+{guessCount}</span>
              <span>palpites enviados</span>
            </div>
          </div>

        </div>
      </main>

      <Image src={appCells} quality={100} alt="Dois celulars exibindo previa da verção mobile" />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const [ poolCountResponse, guessCountResponse, userCountResponse ] = await Promise.all([  
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data,
      guessCount: guessCountResponse.data,
      userCount: userCountResponse.data,
    },
    revalidate: 60 * 5,
  }
} 